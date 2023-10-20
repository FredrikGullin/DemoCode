import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserModel } from "../../models/userModel";

//@desc getUsers
//@route GET /users
//@access Private
export const getUsers = asyncHandler(
  async (req: Request, res: Response, next) => {
    try {
      const users = await UserModel.find();
      if (users.length === 0) {
        res.send("User database is empty!");
      }
      res.json(users);
    } catch (err) {
      res.status(400);
      throw new Error(`${err}`);
    }
  }
);

export default getUsers;
