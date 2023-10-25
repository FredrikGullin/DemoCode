import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserModel } from "../../models/userModel";

//@desc updateUser
//@route PUT /users/update/:id
//@access Private
export const adminUpdateUser = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        res.status(404);
        throw new Error("User not found!");
      }
      user.username = req.body.username;
      user.email = req.body.email;
      user.password = req.body.password;
      user.role = req.body.role;
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json("Server error!");
    }
  }
);

export default adminUpdateUser;
