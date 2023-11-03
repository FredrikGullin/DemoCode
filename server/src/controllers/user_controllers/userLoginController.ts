import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { UserModel } from "../../models/userModel";

const SECRET_KEY: Secret = process.env.JWT_KEY as Secret;

//@desc userLogin
//@route POST /users/login
//@access Pubilc
export const userLogin = asyncHandler(async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user == null) {
      res.status(401).json({ message: "Invalid email or password" });
    } else {
      const valid = await bcrypt.compare(req.body.password, user.password);
      if (valid) {
        const validUser = {
          userId: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          owned_courses: user.owned_courses,
        };
        const accessToken = jwt.sign(validUser, SECRET_KEY, {
          expiresIn: "1h",
        });
        res.json({
          accessToken: accessToken,
          userId: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          owned_courses: user.owned_courses,
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    }
  } catch (err) {
    res.status(400);
    throw new Error(`${err}`);
  }
});

export default userLogin;
