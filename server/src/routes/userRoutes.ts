import { Router } from "express";
import {
  getUsers,
  verifyUser,
  registerUser,
  userLogin,
} from "../controllers/userController";

export const users = Router();
export const register = Router();
export const login = Router();
export const verify = Router();

users.get("/users", getUsers);
register.post("/users/register", registerUser);
login.post("/users/login", userLogin);
verify.post("/users/verify", verifyUser);
