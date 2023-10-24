import express from "express";
import { home } from "./homeRoute";
import {
  current,
  userDelete,
  userGet,
  usersGet,
  userRegister,
  userUpdate,
  loginUser,
  logoutUser,
} from "./userRoutes";

export const routes = express.Router();

routes.use(
  current,
  userDelete,
  home,
  userGet,
  usersGet,
  userRegister,
  userUpdate,
  loginUser,
  logoutUser
);

// routes.use(userRoutes);
