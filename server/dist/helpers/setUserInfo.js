"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var setUserInfo = function setUserInfo(request) {
  var getUserInfo = {
    _id: request._id,
    fullName: request.fullName,
    email: request.email,
    role: request.role
  };
  return getUserInfo;
};

var _default = setUserInfo;
exports.default = _default;