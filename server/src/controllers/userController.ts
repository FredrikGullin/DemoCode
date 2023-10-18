import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel";
import { UserInterface } from "../interfaces/UserInterface";

//@desc getUsers
//@route POST /users
//@access Private
export const getUsers = asyncHandler(
  async (req: Request, res: Response, next) => {
    try {
      const users = await UserModel.find();
      if (users.length === 0) {
        res.send("User database is empty!");
      }
      res.json(users);
    } catch (err) {
      res.status(400);
      throw new Error(`${err}`);
    }
  }
);

//@desc registerUser
//@route POST /register
//@access Public
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.body as UserInterface;
    const hashedPassword = await bcrypt.hash(user.password, 1);
    user.password = hashedPassword;
    user.role = "student";
    try {
      const existingUser = await UserModel.findOne({ email: user.email });
      if (existingUser) {
        res.status(400);
        throw new Error("Email already exists!");
      }
      UserModel.insertMany([user]);
      res.send("User " + user.username + " was registered!");
    } catch (err) {
      throw new Error(`Failed to register user: ${err}`);
    }
  }
);

//@desc userLogin
//@route POST /login
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
          password: user.password,
        };
        const accessToken = jwt.sign(validUser, "secret");
        res.json({ accessToken: accessToken, userId: user.user_id });
      }
    }
  } catch (err) {
    res.status(400);
    throw new Error(`${err}`);
  }
});

export const verifyUser = asyncHandler(async (req: Request, res: Response) => {
  const headerValue = req.headers["authorization"];
  if (headerValue != null) {
    let tokenArray = headerValue.split(" ");
    let token = tokenArray[1];
    console.log(token);
    jwt.verify(token, "secret", (err) => {
      if (err) {
        res.send("Access denied!");
      } else {
        res.send("Access granted!");
      }
    });
  } else {
    res.sendStatus(401);
    throw new Error("Missing authorization header!");
  }
});
