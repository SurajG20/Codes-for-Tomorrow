import mongoose, { Schema } from 'mongoose';
import validator = require('validator');

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  token?: string;
}

const UserSchema = new Schema<User>({
  firstname: { type: String, required: [true, 'Please Provide FirstName'] },
  lastname: { type: String, required: [true, 'Please Provide LastName'] },
  email: {
    type: String,
    required: [true, 'Please Provide Email'],
    validate: validator.isEmail,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please Provide Password'],
    minlength: 6,
  },
  token: { type: String },
});

const UserModel = mongoose.model<User>('User', UserSchema);

export default UserModel;
