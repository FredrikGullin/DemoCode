import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { UserModel } from "../../models/userModel";

const SECRET_KEY: Secret = process.env.JWT_KEY as Secret;

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const accessToken = req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken) {
      throw new Error("Controller: Missing access token!");
    }

    const decoded = jwt.verify(accessToken, SECRET_KEY) as JwtPayload;

    if (decoded.userId !== id) {
      throw new Error("Controller: Unauthorized action!");
    }

    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404);
      throw new Error("Controller: User not found!");
    }
    res.status(200).send("User successfully deleted!").json(deletedUser);
  } catch (error) {
    res.status(500);
    throw new Error(`Controller: Error deleting user - ${error}`);
  }
});

export default deleteUser;
