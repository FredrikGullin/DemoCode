import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { UserModel } from "../../models/userModel";

const SECRET_KEY: Secret = process.env.JWT_KEY as Secret;

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const accessToken = req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken) {
      res.status(401);
      throw new Error("Controller: No access token provided!");
    }

    const decoded = jwt.verify(accessToken, SECRET_KEY) as JwtPayload;

    if (decoded.userId !== id) {
      throw new Error("Controller: Unauthorized action!");
    }

    const user = await UserModel.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("Controller: User not found!");
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(401);
    throw new Error(`Controller: Error fetching user! - ${error}`);
  }
});

export default getUser;
