import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../../models/userModel";
import { UpdateUserInterface } from "../../interfaces/UpdateUserInterface";

const SECRET_KEY: Secret = process.env.JWT_KEY as Secret;

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const accessToken = req.header("Authorization")?.replace("Bearer ", "");
    const { username, email, password }: UpdateUserInterface = req.body;

    if (!accessToken) {
      throw new Error("Controller: Missing access token!");
    }

    const decoded = jwt.verify(accessToken, SECRET_KEY) as JwtPayload;

    if (decoded.userId !== id) {
      throw new Error("Controller: Unauthorized action!");
    }

    const user = await UserModel.findById(id);
    if (!user) {
      res.status(404).json({ message: "Controller: User not found!" });
      return;
    }

    user.username = username || user.username;
    user.email = email || user.email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();

    console.log(updatedUser);

    const updatedToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: decoded.role,
        owned_courses: user?.owned_courses,
      },
      SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "User updated successfully!",
      accessToken: updatedToken,
      userId: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      owned_courses: user?.owned_courses,
    });
  } catch (error) {
    res.status(500);
    throw new Error(`Controller: Error updating user! - ${error}`);
  }
});

export default updateUser;
