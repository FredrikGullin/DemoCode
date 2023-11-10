import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { UserModel } from "../../models/userModel";
import { UserInterface } from "../../interfaces/UserInterface";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.body as UserInterface;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    user.role = "student";
    user.owned_courses = [];
    try {
      const existingUser = await UserModel.findOne({ email: user.email });
      if (existingUser) {
        res.status(400);
        throw new Error("Email already exists!");
      }
      UserModel.insertMany([user]);
      res.send("User " + user.username + " was registered!");
    } catch (err) {
      throw new Error(`Failed to register user: ${err}`);
    }
  }
);

export default registerUser;
