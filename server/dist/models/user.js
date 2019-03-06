"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var roles = _interopRequireWildcard(require("../constants/roles"));

var _logger = _interopRequireDefault(require("../lib/logger"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose.default.Schema;
var UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  provider: {
    type: String
  },
  providerId: {
    type: String
  },
  role: {
    type: String,
    enum: [roles.ROLE_GUEST, roles.ROLE_BRAND, roles.ROLE_INFLUENCER, roles.ROLE_ADMIN],
    default: roles.ROLE_GUEST
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: String
  },
  confirmationToken: {
    type: String
  },
  emailConfirmed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});
UserSchema.pre('save', function (next) {
  /* eslint-disable-line consistent-return */
  var user = this;
  var SALT_FACTOR = 5;
  if (!user.isModified('password')) return next();

  _bcrypt.default.genSalt(SALT_FACTOR, function (err, salt) {
    /* eslint-disable-line consistent-return */
    if (err) return next(err);

    _bcrypt.default.hash(user.password, salt, null).then(function (hash) {
      user.password = hash;
      next();
    }).catch(function (error) {
      return next(error);
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  _bcrypt.default.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      _logger.default.error(err);

      return cb(err);
    }

    cb(null, isMatch);
  });
};

var _default = _mongoose.default.model('User', UserSchema);

exports.default = _default;