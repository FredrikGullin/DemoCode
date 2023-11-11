import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserModel } from "../../models/userModel";

export const adminGetUsers = asyncHandler(
  async (req: Request, res: Response, next) => {
    try {
      const users = await UserModel.find();
      if (users.length === 0) {
        res.send("Controller: User database is empty!");
      }
      res.json(users);
    } catch (error) {
      res.status(400);
      throw new Error(`Controller: Error fetching users! - ${error}`);
    }
  }
);

export default adminGetUsers;
