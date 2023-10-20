import mongoose, { Schema, model } from "mongoose";
import { UserInterface } from "../interfaces/UserInterface";

const UserSchema = new Schema<UserInterface>(
  {
    user_id: Number,
    username: String,
    email: String,
    password: String,
    role: String,
  },
  {
    timestamps: true,
  }
);

export const UserModel = model("User", UserSchema);
