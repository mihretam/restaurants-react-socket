"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendMail = sendMail;

var _nodemailer = _interopRequireDefault(require("../lib/nodemailer"));

var _logger = _interopRequireDefault(require("../lib/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sendMail(req, res, next, user, type) {
  /* eslint-disable-line import/prefer-default-export */
  switch (type) {
    case 'emailConfirm':
      {
        var message = {
          to: user.email,
          subject: 'Please confirm your email',
          text: "".concat('You are receiving this because you (or someone else) have registered new account on Brand Master Flash.\n\n' + 'Please click on the following link, or paste this into your browser to complete the process:\n\n' + 'http://').concat(req.headers.host, "/api/confirmEmail/").concat(user.confirmationToken, "\n\n") + "If you did not request this, please ignore this email and your account will remain inactive.\n"
        };

        _nodemailer.default.sendMail(message, function (error) {
          if (error) {
            _logger.default.error(error);

            return next(error);
          }
        });

        break;
      }

    case 'passwordReset':
      {
        var _message = {
          to: user.email,
          subject: 'Password reset request',
          text: "".concat('You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' + 'Please click on the following link, or paste this into your browser to complete the process:\n\n' + 'http://').concat(req.headers.host, "/api/resetPassword/").concat(user.resetPasswordToken, "\n\n") + "If you did not request this, please ignore this email and your password will remain unchanged.\n"
        };

        _nodemailer.default.sendMail(_message, function (error) {
          if (error) {
            _logger.default.error(error);

            return next(error);
          }
        });

        break;
      }

    default:
      {
        res.code(422).send('Email could not be sent');
      }
  }
}