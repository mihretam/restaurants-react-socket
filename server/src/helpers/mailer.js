import transporter from '../lib/nodemailer';
import logger from '../lib/logger';


export function sendMail(req, res, next, user, type) { /* eslint-disable-line import/prefer-default-export */
  switch (type) {
    case 'emailConfirm': {
      const message = {
        to: user.email,
        subject: 'Please confirm your email',
        text: `${'You are receiving this because you (or someone else) have registered new account on Brand Master Flash.\n\n'
          + 'Please click on the following link, or paste this into your browser to complete the process:\n\n'
          + 'http://'}${req.headers.host}/api/v1/confirmEmail/${user.confirmationToken}\n\n`
          + `If you did not request this, please ignore this email and your account will remain inactive.\n`,
      };
      transporter.sendMail(message, (error) => {
        if (error) {
          logger.error(error);
          return next(error);
        }
      });
      break;
    }
    case 'passwordReset': {
      const message = {
        to: user.email,
        subject: 'Password reset request',
        text: `${'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
          + 'Please click on the following link, or paste this into your browser to complete the process:\n\n'
          + 'http://'}${req.headers.host}/api/v1/resetPassword/${user.resetPasswordToken}\n\n`
          + `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };
      transporter.sendMail(message, (error) => {
        if (error) {
          logger.error(error);
          return next(error);
        }
      });
      break;
    }
    default: {
      res.code(422).send('Email could not be sent');
    }
  }
}
