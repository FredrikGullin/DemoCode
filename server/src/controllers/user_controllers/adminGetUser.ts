import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserModel } from "../../models/userModel";

export const adminGetUser = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const accessToken = req.header("Authorization")?.replace("Bearer ", "");

      if (!accessToken) {
        res.status(401);
        throw new Error("Controller: No access token provided!");
      }

      const user = await UserModel.findById(req.params.id);
      if (!user) {
        res.status(404);
        throw new Error("Controller: User not found!");
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(401);
      throw new Error(`Controller: Error fetching users! - ${error}`);
    }
  }
);

export default adminGetUser;
