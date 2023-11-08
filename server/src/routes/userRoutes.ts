import { Router } from "express";
import auth from "../middleware/auth";
import adminLock from "../middleware/adminLock";
import deleteUser from "../controllers/user_controllers/deleteUserController";
import getUser from "../controllers/user_controllers/getUserController";
import getUsers from "../controllers/user_controllers/getUsersController";
import registerUser from "../controllers/user_controllers/registerUserController";
import updateUser from "../controllers/user_controllers/updateUserController";
import userLogin from "../controllers/user_controllers/userLoginController";
import userLogout from "../controllers/user_controllers/userLogoutController";
import getOwnedCourses from "../controllers/user_controllers/getUserCoursesController";

const userRouter = Router();

// export const current = Router();
// export const userDelete = Router();
// export const userGet = Router();
// export const usersGet = Router();
// export const userRegister = Router();
// export const userUpdate = Router();
// export const loginUser = Router();
// export const logoutUser = Router();
// export const userCourses = Router();

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
userRouter.get("/admin/users", adminLock, getUsers);

export default userRouter;
