import User from '../models/user';
import logger from '../lib/logger';


export async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export async function addNewUser(user) {
  try {
    const newUser = new User(user);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export async function verifyToken(requestToken) {
  try {
    const user = await User.findOne({ resetPasswordToken: requestToken, resetPasswordExpires: { $gt: Date.now() } });
    return user;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export async function verifyEmail(requestToken) {
  try {
    const user = await User.findOne({ confirmationToken: requestToken });
    return user;
  } catch (error) {
    throw error;
  }
}
