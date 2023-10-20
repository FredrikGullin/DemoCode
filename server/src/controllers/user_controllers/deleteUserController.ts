import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserModel } from "../../models/userModel";

//@desc deleteUser
//@route GET /users/delete/:id
//@access Private
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  try {
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
});

export default deleteUser;
