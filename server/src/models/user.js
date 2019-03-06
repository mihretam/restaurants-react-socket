import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import {
  ROLE_GUEST,
  ROLE_BRAND,
  ROLE_INFLUENCER,
  ROLE_ADMIN,
} from '../constants/roles';
import logger from '../lib/logger';

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
  },
  providerId: {
    type: String,
  },
  role: {
    type: String,
    enum: [ROLE_GUEST, ROLE_BRAND, ROLE_INFLUENCER, ROLE_ADMIN],
    default: ROLE_GUEST,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: String,
  },
  confirmationToken: {
    type: String,
  },
  emailConfirmed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

UserSchema.pre('save', function (next) { /* eslint-disable-line consistent-return */
  const user = this;
  const SALT_FACTOR = 5;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => { /* eslint-disable-line consistent-return */
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null)
      .then((hash) => {
        user.password = hash;
        next();
      })
      .catch((error) => {
        logger.error(error);
        return next(error);
      });
  });
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const comparison = await bcrypt.compare(candidatePassword, this.password);
  return comparison;
};


export default mongoose.model('User', UserSchema);
