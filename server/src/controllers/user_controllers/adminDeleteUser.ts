import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserModel } from "../../models/userModel";

export const adminDeleteUser = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const accessToken = req.header("Authorization")?.replace("Bearer ", "");

      if (!accessToken) {
        throw new Error("Missing access token!");
      }

      const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        res.status(404);
        throw new Error("User not found!");
      }
      res.status(200).send("User successfully deleted!").json(deletedUser);
    } catch (err) {
      res.status(500);
      throw new Error("Server error!");
    }
  }
);

export default adminDeleteUser;
