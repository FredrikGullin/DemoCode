import { Router } from "express";
import auth from "../middleware/auth";
import currentUser from "../controllers/user_controllers/currentUserController";
import deleteUser from "../controllers/user_controllers/deleteUserController";
import getUser from "../controllers/user_controllers/getUserController";
import getUsers from "../controllers/user_controllers/getUsersController";
import registerUser from "../controllers/user_controllers/registerUserController";
import updateUser from "../controllers/user_controllers/updateUserController";
import userLogin from "../controllers/user_controllers/userLoginController";
import userLogout from "../controllers/user_controllers/userLogoutController";

export const current = Router();
export const userDelete = Router();
export const userGet = Router();
export const usersGet = Router();
export const userRegister = Router();
export const userUpdate = Router();
export const loginUser = Router();
export const logoutUser = Router();

//@Access Public
userRegister.post("/users/register", registerUser);
loginUser.post("/users/login", userLogin);

//@Access Private
current.get("/users/current", auth, currentUser);
logoutUser.post("/users/logout", auth, userLogout);
userDelete.delete("/users/delete/:id", auth, deleteUser);
userGet.get("/users/:id", auth, getUser);
usersGet.get("/users", auth, getUsers);
userUpdate.put("/users/update/:id", auth, updateUser);

// Courses
// My Courses
