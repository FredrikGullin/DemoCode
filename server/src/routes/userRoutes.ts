import { Router } from "express";
import auth from "../middleware/auth";
import adminLock from "../middleware/adminLock";
import deleteUser from "../controllers/user_controllers/deleteUserController";
import getUser from "../controllers/user_controllers/getUserController";
import registerUser from "../controllers/user_controllers/registerUserController";
import updateUser from "../controllers/user_controllers/updateUserController";
import userLogin from "../controllers/user_controllers/userLoginController";
import userLogout from "../controllers/user_controllers/userLogoutController";
import getOwnedCourses from "../controllers/user_controllers/getUserCoursesController";
import adminGetUsers from "../controllers/user_controllers/adminGetUsers";
import adminGetUser from "../controllers/user_controllers/adminGetUser";
import adminUpdateUser from "../controllers/user_controllers/adminUpdateUser";
import adminDeleteUser from "../controllers/user_controllers/adminDeleteUser";

const userRouter = Router();

//@Access Public
userRouter.post("/users/register", registerUser);
userRouter.post("/users/login", userLogin);

//@Access Private
userRouter.post("/users/logout", auth, userLogout);
userRouter.get("/users/:id", auth, getUser);
userRouter.put("/users/update/:id", auth, updateUser);
userRouter.get("/users/:id/courses", auth, getOwnedCourses);
userRouter.delete("/users/delete/:id", auth, deleteUser);

//@Access Admin
userRouter.get("/admin/users", adminLock, adminGetUsers);
userRouter.get("/admin/users/:id", adminLock, adminGetUser);
userRouter.put("/admin/users/update/:id", adminLock, adminUpdateUser);
userRouter.delete("/admin/users/delete/:id", adminLock, adminDeleteUser);

export default userRouter;
