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
      res.send("Login failed!");
    } else {
      const valid = await bcrypt.compare(req.body.password, user.password);
      if (valid) {
        const validUser = {
          username: user.username,
          email: user.email,
          id: user.user_id,
        };
        const accessToken = jwt.sign(validUser, SECRET_KEY, {
          expiresIn: "5m",
        });
        res.json({
          accessToken: accessToken,
          userId: user.user_id,
          username: user.username,
          email: user.email,
        });
      }
    }
  } catch (err) {
    res.status(400);
    throw new Error(`${err}`);
  }
});

export default userLogin;
