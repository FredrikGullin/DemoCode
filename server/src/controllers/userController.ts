import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../models/userModel";
import { UserInterface } from "../interfaces/UserInterface";

dotenv.config();

const SECRET_KEY: Secret = process.env.JWT_KEY as Secret;

//@desc getUsers
//@route GET /users
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

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found!");
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(401);
    throw new Error("Error fetching user!");
  }
});

//@desc registerUser
//@route POST /users/register
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

//@desc userLogin
//@route PUT /users/update
//@access Private
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found!");
    }
    user.user_id = req.body.user_id;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.role = req.body.role;
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json("Server error!");
  }
});

//@desc userLogin
//@route GET /users/current
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

//@desc userLogin
//@route GET /users/current
//@access Private
export const currentUser = asyncHandler(async (req: Request, res: Response) => {
  res.send("Current user information!");
});
