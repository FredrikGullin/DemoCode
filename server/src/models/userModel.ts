import mongoose, { Schema, model } from "mongoose";
import { UserInterface } from "../interfaces/UserInterface";

const UserSchema = new Schema<UserInterface>(
  {
    user_id: String,
    username: String,
    email: String,
    password: String,
    role: String,
    courses: [
      {
        course_id: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const UserModel = model("User", UserSchema);
