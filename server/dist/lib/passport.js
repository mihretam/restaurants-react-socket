"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _passportJwt = require("passport-jwt");

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// serialize and deserialize
_passport.default.serializeUser(function (user, done) {
  done(null, user);
});

_passport.default.deserializeUser(function (obj, done) {
  done(null, obj);
}); // JWT Options


var jwtOptions = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.APP_SECRET
}; // JWT login strategy

var jwtLogin = new _passportJwt.Strategy(jwtOptions, function (payload, done) {
  _user.default.findById(payload._id, function (err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

_passport.default.use(jwtLogin);