"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findUserByEmail = findUserByEmail;
exports.addNewUser = addNewUser;
exports.verifyToken = verifyToken;
exports.verifyEmail = verifyEmail;

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findUserByEmail(email) {
  return new Promise(function (resolve, reject) {
    _user.default.findOne({
      email: email
    }).then(function (response) {
      return resolve(response);
    }).catch(function (error) {
      reject(error);
    });
  });
}

function addNewUser(user) {
  return new Promise(function (resolve, reject) {
    var newUser = new _user.default(user);
    newUser.save().then(function (savedUser) {
      return resolve(savedUser);
    }).catch(function (error) {
      reject(error);
    });
  });
}

function verifyToken(requestToken) {
  return new Promise(function (resolve, reject) {
    _user.default.findOne({
      resetPasswordToken: requestToken,
      resetPasswordExpires: {
        $gt: Date.now()
      }
    }).then(function (user) {
      return resolve(user);
    }).catch(function (error) {
      return reject(error);
    });
  });
}

function verifyEmail(requestToken) {
  return new Promise(function (resolve, reject) {
    _user.default.findOne({
      confirmationToken: requestToken
    }).then(function (user) {
      if (user) {
        return resolve(user);
      }
    }).catch(function (error) {
      return reject(error);
    });
  });
}