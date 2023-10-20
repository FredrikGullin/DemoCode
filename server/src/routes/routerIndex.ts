import express from "express";
import { home } from "./homeRoute";
import {
  users,
  user,
  register,
  update,
  login,
  userDelete,
  current,
} from "./userRoutes";

export const routes = express.Router();

routes.use(home, users, user, register, update, login, userDelete, current);

// routes.use(userRoutes);
