// import mongoose, { Schema, Document, Model } from "mongoose";
// import { IUSER } from "../types/user.interface";
// import Message from "./message";
// const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// const UserSchema: Schema<IUSER> = new Schema({
//   username: {
//     type: String,
//     required: [true, "Username is Required"],
//     trim: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: [true, "Email is Required"],
//     match: [emailRegex, "Please use a valid email address"],
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: [true, "Password is Required"],
//   },
//   verifyCode: {
//     type: String,
//     required: [true, "Verifycode is Required"],
//   },
//   verifyCodeExpiery: {
//     type: String,
//     required: [true, "VerifycodeExpired is Required"],
//   },
//   isVerified: {
//     type: Boolean,
//     default: false,
//   },
//   message: [Message],
// });

// const User: Model<IUSER> = mongoose.model("User", UserSchema);

// export default User;

import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: Message[];
}

// Updated User schema
const UserSchema: Schema<User> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify Code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify Code Expiry is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;