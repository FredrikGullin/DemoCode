import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { UserModel } from "../../models/userModel";
import { UserInterface } from "../../interfaces/UserInterface";

//@desc registerUser
//@route POST /users/register
//@access Public
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.body as UserInterface;
    const hashedPassword = await bcrypt.hash(user.password, 1);
    user.password = hashedPassword;
    user.role = "student";
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
