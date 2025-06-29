import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { UserModel } from "../../models/userModel";
import { UpdateUserInterface } from "../../interfaces/UpdateUserInterface";

export const adminUpdateUser = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const accessToken = req.header("Authorization")?.replace("Bearer ", "");
      const {
        username,
        email,
        password,
        role,
        owned_courses,
      }: UpdateUserInterface = req.body;
      if (!accessToken) {
        throw new Error("Controller: Missing access token!");
      }

      const user = await UserModel.findById(id);
      if (!user) {
        res.status(404).json({ message: "Controller: User not found!" });
        return;
      }

      user.username = username || user.username;
      user.email = email || user.email;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }

      if (role) {
        user.role = role || user.role;
      }

      if (owned_courses) {
        user.owned_courses = owned_courses || user.owned_courses;
      }

      const updatedUser = await user.save();
      res.status(200).json({
        message: "User updated successfully!",
        user: {
          id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          role: updatedUser.role,
          owned_courses: updatedUser.owned_courses,
        },
      });
    } catch (error) {
      res.status(500);
      throw new Error(`Controller: Error updating user! - ${error}`);
    }
  }
);

export default adminUpdateUser;
