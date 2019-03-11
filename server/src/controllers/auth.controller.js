import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import setUserInfo from '../helpers/setUserInfo';
import logger from '../lib/logger';
import * as User from '../db/dbUser';
import * as mailer from '../helpers/mailer';
import messages from '../constants/errorMessages';

// Generate JWT
function generateToken(user) {
  return jwt.sign(user, process.env.APP_SECRET, {
    expiresIn: 604800,
  });
}

// Login request function

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByEmail(email);
    if (!user) {
      return res.status(404)
        .send({
          status: 404,
          error: `User with email: ${email}, does not exist. Please check your details.`,
        });
    }
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401)
          .send({ error: messages.INCORRECT_PASSWORD });
    }
    if (passwordMatch && !user.emailConfirmed) {
      return res.status(401)
        .send({ error: messages.EMAIL_NOT_VERIFIED });
    }
    return res.status(200)
      .send({
        token: generateToken(setUserInfo(user)),
        user: setUserInfo(user),
      });
  } catch (err) {
    logger.error(err);
    return next(err);
  }
}

// Register request function. Returns registered user.

export async function register(req, res, next) {
  try {
    let token = null;
    crypto.randomBytes(48, async (err, buffer) => {
      token = buffer.toString('hex');
      const user = {
        email: req.body.email,
        fullName: req.body.fullName,
        password: req.body.password,
        role: req.body.role,
        confirmationToken: token,
        emailConfirmed: false,
      };
      // Return error if any of the required fields are missing.
      if (!user.email || !user.fullName || !user.password) {
        return res.status(400)
          .send({ error: messages.ALL_FIELDS_REQUIRED });
      }
      const existingUser = await User.findUserByEmail(user.email).catch((err) => { logger.error(err); return next(err); });
      if (existingUser && existingUser.emailConfirmed) {
        return res.status(409)
          .send({ error: messages.EMAIL_ALREADY_IN_USE });
      }
      if (existingUser && !existingUser.emailConfirmed) {
        return res.status(400)
          .send({ error: `Account with that email already exists, but email has not been confirmed. Please click the link that was sent to ${existingUser.email}.` });
      }
      const newUser = await User.addNewUser(user);
      await mailer.sendMail(req, res, next, newUser, 'emailConfirm');
      return res.status(201).send({ message: messages.CHECK_EMAIL });
    });
  } catch (err) {
    if (err) {
      logger.error(err);
      return next(err);
    }
  }
}

// Get logged in user profile

export function profile(req, res, next) { /* eslint-disable-line no-unused-vars */
  if (!req.user) {
    return res.status(403)
      .send({
        status: 403,
        message: messages.NOT_LOGGED_IN,
      });
  }
  return res.status(200)
    .send({ profile: setUserInfo(req.user) });
}

// Forgot password request, saves password request token.

export async function forgotPasswordRequest(req, res, next) {
  try {
    const { email } = req.body;
    const user = await User.findUserByEmail(email);
    if (!user) {
      return res.status(422)
        .json({ error: messages.REQUEST_NOT_PROCESSED });
    }
    if (user) {
      const modifiedUser = user;
      crypto.randomBytes(48, async (err, buffer) => {
        const resetToken = buffer.toString('hex');
        modifiedUser.resetPasswordToken = resetToken;
        modifiedUser.resetPasswordExpires = Date.now() + 3600000;
        const savedUser = await modifiedUser.save();
        await mailer.sendMail(req, res, next, savedUser, 'passwordReset');
      });
    }
    return res.status(200).send({ message: messages.EMAIL_PASSWORD_RESET });
  } catch (err) {
    logger.error(err);
    return next(err);
  }
}

// Password reset request. Verifies the token and resets the password.

export async function resetPassword(req, res, next) {
  try {
    const requestToken = req.params.token;
    const foundUser = await User.verifyToken(requestToken);
    if (!foundUser) {
      return res.status(422)
        .json({ error: messages.TOKEN_EXPIRED });
    }
    const userToModify = foundUser;
    userToModify.password = req.body.password;
    userToModify.resetPasswordToken = undefined;
    userToModify.resetPasswordExpires = undefined;
    await userToModify.save();
    return res.status(200).send({ message: messages.PASSWORD_CHANGED_SUCCESSFULLY });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
}

// Confirm email function. This password verifies the token sent to email and confirms account.

export async function emailConfirm(req, res, next) {
  try {
    const emailToken = req.params.token;
    const foundUser = await User.verifyEmail(emailToken);
    if (!foundUser) {
      return res.status(404).send({ message: messages.USER_NOT_FOUND });
    }
    const modifyUser = foundUser;
    modifyUser.confirmationToken = null;
    modifyUser.emailConfirmed = true;
    await modifyUser.save();
    return res.status(200).send({ message: messages.EMAIL_CONFIRMED });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
}

export async function addRestaurant (req, res, next) {
  console.log("s")
  //res.json({test: 'aasdas'})
  var restaurant = {
    restaurantName: req.body.restaurantName,
    workingHours: req.body.workingHours,
    restaurantLink: req.body.restaurantLink
  };
  Restaurant.save(restaurant).then( (savedRestaurant) => {
    res.status(200).send(savedRestaurant._id.toString());
    next();
  }).catch( (err) => {
    res.status(400).send(err);
   });
 
  
};