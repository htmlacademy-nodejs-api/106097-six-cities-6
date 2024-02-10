import { User } from '../../types/index.js';
import { Schema, Document, model } from 'mongoose';

export interface UserDocument extends User, Document {
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [1, 'Min length for user name is 1'],
    maxlength: [15, 'Max length for user name is 15'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
  },
  avatarPath: {
    type: String,
    required: false,
    match: [/^(.*\.(jpg|png))$/, 'Avatar must be a JPG or PNG image'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Min length for user password is 6'],
    maxlength: [12, 'Max length for user password is 12'],
  },
  type: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const UserModel = model<UserDocument>('User', userSchema);
