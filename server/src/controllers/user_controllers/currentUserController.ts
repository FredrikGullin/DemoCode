import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

//@desc userLogin
//@route GET /users/current
//@access Private
export const currentUser = asyncHandler(async (req: Request, res: Response) => {
  res.send("Current user information!");
});

export default currentUser;
