import mongoose, { Schema } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

import constants from '../config/constants';

const UserSchema = new Schema(
  {
    username: { type: String, unique: true },
    email: String,
    firstname: String,
    lastname: String,
    avatar: String,
    password: String,
  },
  { timestamps: true }
);

UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }
  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },
  authenticateUser(password) {
    return compareSync(password, this.password);
  },
  createToken() {
    const token = jwt.sign(
      {
        _id: this._id,
      },
      constants.JWT_SECRECT
    );
    return token;
  },
};

export default mongoose.model('User', UserSchema);
