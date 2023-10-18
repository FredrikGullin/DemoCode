import express from "express";
import { home } from "./homeRoute";
import { users, register, login, verify } from "./userRoutes";

export const routes = express.Router();

routes.use(home, users, register, login, verify);

// routes.use(userRoutes);
