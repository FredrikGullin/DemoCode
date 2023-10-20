import { Router } from "express";
import auth from "../middleware/auth";
import {
  getUsers,
  getUser,
  registerUser,
  updateUser,
  userLogin,
  deleteUser,
  currentUser,
} from "../controllers/userController";

export const users = Router();
export const user = Router();
export const register = Router();
export const update = Router();
export const login = Router();
export const userDelete = Router();
export const current = Router();

users.get("/users", getUsers);
user.get("/users/:id", getUser);
register.post("/users/register", registerUser);
update.put("/users/update/:id", updateUser);
login.post("/users/login", userLogin);
userDelete.delete("/users/delete/:id", deleteUser);
current.get("/users/current", auth, currentUser);
