import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserModel } from "../../models/userModel";

export const adminDeleteUser = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const accessToken = req.header("Authorization")?.replace("Bearer ", "");

      if (!accessToken) {
        throw new Error("Controller: Missing access token!");
      }

      const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        res.status(404);
        throw new Error("Controller: User not found!");
      }
      res.status(200).send("User successfully deleted!").json(deletedUser);
    } catch (error) {
      res.status(500);
      throw new Error(`Controller: Error deleting user! - ${error}`);
    }
  }
);

export default adminDeleteUser;
