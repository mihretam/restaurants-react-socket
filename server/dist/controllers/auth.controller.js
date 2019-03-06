"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;
exports.register = register;
exports.profile = profile;
exports.forgotPasswordRequest = forgotPasswordRequest;
exports.resetPassword = resetPassword;
exports.emailConfirm = emailConfirm;

var _crypto = _interopRequireDefault(require("crypto"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _setUserInfo = _interopRequireDefault(require("../helpers/setUserInfo"));

var _nodemailer = _interopRequireDefault(require("../lib/nodemailer"));

var _logger = _interopRequireDefault(require("../lib/logger"));

var User = _interopRequireWildcard(require("../db/dbUser"));

var mailer = _interopRequireWildcard(require("../helpers/mailer"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Generate JWT
function generateToken(user) {
  return _jsonwebtoken.default.sign(user, process.env.APP_SECRET, {
    expiresIn: 604800
  });
} // Login request function. Generates JWT as a response.


function login(req, res, next) {
  User.findUserByEmail(req.body.email).then(function (user) {
    if (!user) {
      _logger.default.info('Unauthorized login attempt');

      return next(null, false, {
        error: 'Your login details could not be verified. Please try again.'
      });
    }

    if (!user.emailConfirmed) {
      _logger.default.info('Email not authorized Login attempt!');

      return res.status(403).send({
        message: 'Your email has not been verified. Please verify email before trying to log in.'
      });
    }

    if (user) {
      user.comparePassword(req.body.password, function (error, isMatch) {
        /* eslint-disable-line consistent-return */
        if (error) {
          _logger.default.error(error);

          return next(null, false, {
            error: 'Your password is not correct'
          });
        }

        if (isMatch) {
          res.send({
            token: generateToken((0, _setUserInfo.default)(user)),
            user: (0, _setUserInfo.default)(user)
          });
        }
      });
    }
  }).catch(function (error) {
    _logger.default.error(error);

    return next(error);
  });
} // Register request function. Returns registered user.


function register(req, res, next) {
  /* eslint-disable-line consistent-return */
  var token = null;

  _crypto.default.randomBytes(48, function (err, buffer) {
    token = buffer.toString('hex');
    console.log(token);
    var user = {
      email: req.body.email,
      fullName: req.body.fullName,
      password: req.body.password,
      role: req.body.role,
      confirmationToken: token,
      emailConfirmed: false
    }; // Return error if no email provided

    if (!user.email) {
      return res.status(422).send({
        error: 'You must enter an email address.'
      });
    } // Return error if full name not provided


    if (!user.fullName) {
      return res.status(422).send({
        error: 'You must enter your full name.'
      });
    } // Return error if no password provided


    if (!user.password) {
      return res.status(422).send({
        error: 'You must enter a password'
      });
    }

    User.findUserByEmail(user.email).then(function (existingUser) {
      if (existingUser && existingUser.emailConfirmed) {
        return res.status(422).send({
          error: 'That email address is already in use'
        });
      }

      if (existingUser && !existingUser.emailConfirmed) {
        return res.status(422).send({
          error: "Account with that email already exists, but email has not been confirmed. Please click the link that was sent to ".concat(existingUser.email, ".")
        });
      }
    }).then(function () {
      return User.addNewUser(user).then(function (savedUser) {
        mailer.sendMail(req, res, next, savedUser, 'emailConfirm');
        res.status(201).send({
          message: 'Please check your email to complete registration process.'
        });
      });
    }).catch(function (error) {
      if (error) {
        _logger.default.error(error);

        return next(error);
      }
    });
  });
} // Get logged in user profile


function profile(req, res, next) {
  /* eslint-disable-line no-unused-vars */
  if (!req.user) {
    return res.status(404).send({
      message: 'You are not logged in!'
    });
  }

  return res.status(200).send({
    profile: (0, _setUserInfo.default)(req.user)
  });
} // Forgot password request, saves password request token.


function forgotPasswordRequest(req, res, next) {
  var email = req.body.email;
  User.findUserByEmail(email).then(function (userData) {
    if (!userData) {
      res.status(422).json({
        error: 'Your request could not be processed as entered. Please try again.'
      });
    }

    var modifiedUser = userData;

    if (userData) {
      _crypto.default.randomBytes(48, function (err, buffer) {
        var resetToken = buffer.toString('hex');
        modifiedUser.resetPasswordToken = resetToken;
        modifiedUser.resetPasswordExpires = Date.now() + 3600000;
        return modifiedUser.save().then(function (savedUser) {
          mailer.sendMail(req, res, next, savedUser, 'passwordReset');
        }).catch(function (error) {
          _logger.default.error(error);

          return next(error);
        });
      });

      return res.status(200).json({
        message: 'Please check your email for the link to reset your password.'
      });
    }
  }).catch(function (error) {
    _logger.default.error(error);

    return next(error);
  });
}

function resetPassword(req, res, next) {
  var requestToken = req.params.token;
  User.verifyToken(requestToken).then(function (foundUser) {
    if (!foundUser) {
      res.status(422).json({
        error: 'Your token has expired. Please attempt to reset your password again.'
      });
    }

    var userToModify = foundUser;
    userToModify.password = req.body.password;
    userToModify.resetPasswordToken = undefined;
    userToModify.resetPasswordExpires = undefined;
    userToModify.save().then(function (savedUser) {
      /* eslint-disable-line no-unused-vars */
      res.status(200).json({
        message: 'Your password was changed successfully'
      });
    }).catch(function (error) {
      _logger.default.error(error);

      return next(error);
    });
  }).catch(function (error) {
    _logger.default.error('Password change request error: ', error);

    return next(error);
  });
}

function emailConfirm(req, res, next) {
  var emailToken = req.params.token;
  console.log(emailToken);
  User.verifyEmail(emailToken).then(function (foundUser) {
    if (!foundUser) {
      res.status(422).send({
        error: 'This user can not be found!'
      });
    }

    var modifyUser = foundUser;
    modifyUser.confirmationToken = null;
    modifyUser.emailConfirmed = true;
    modifyUser.save().then(function (savedUser) {
      /* eslint-disable-line no-unused-vars */
      res.status(200).send({
        message: 'Email confirmed. You can now log in.'
      });
    }).catch(function (error) {
      _logger.default.error(error);

      return next(error);
    });
  });
}