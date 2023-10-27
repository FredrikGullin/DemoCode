import { Router } from "express";
import auth from "../middleware/auth";
import adminLock from "../middleware/adminLock";
import currentUser from "../controllers/user_controllers/currentUserController";
import deleteUser from "../controllers/user_controllers/deleteUserController";
import getUser from "../controllers/user_controllers/getUserController";
import getUsers from "../controllers/user_controllers/getUsersController";
import registerUser from "../controllers/user_controllers/registerUserController";
import updateUser from "../controllers/user_controllers/updateUserController";
import userLogin from "../controllers/user_controllers/userLoginController";
import userLogout from "../controllers/user_controllers/userLogoutController";
import getOwnedCourses from "../controllers/user_controllers/getUserCoursesController";

export const current = Router();
export const userDelete = Router();
export const userGet = Router();
export const usersGet = Router();
export const userRegister = Router();
export const userUpdate = Router();
export const loginUser = Router();
export const logoutUser = Router();
export const userCourses = Router();

//@Access Public
userRegister.post("/users/register", registerUser);
loginUser.post("/users/login", userLogin);

//@Access Private
current.get("/users/current", auth, currentUser);
logoutUser.post("/users/logout", auth, userLogout);
userGet.get("/users/:id", auth, getUser);
userUpdate.put("/users/update/:id", auth, updateUser);
userCourses.get("/users/:id/courses", auth, getOwnedCourses);

//@Access Admin
usersGet.get("/admin/users", adminLock, getUsers);
userDelete.delete("/admin/users/delete/:id", adminLock, deleteUser);
