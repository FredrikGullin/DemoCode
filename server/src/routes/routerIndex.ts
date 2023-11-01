import express from "express";

import userRouter from "./userRoutes";
import courseRouter from "./courseRoutes";
// import { home } from "./homeRoute";
// import // current,
// userCourses,
// userDelete,
// userGet,
// usersGet,
// userRegister,
// userUpdate,
// loginUser,
// logoutUser,
// from "./userRoutes";
// import courseCreate,
// courseDelete,
// courseGet,
// coursesGet,
// courseLessonGet,
// courseLessonsGet,
// courseSearch,
// courseUpdate,
// coursePurchase,
// courseRouter from "./courseRoutes";

export const routes = express.Router();

routes.use(
  // current,
  // home,
  // loginUser,
  // logoutUser,
  // courseCreate,
  // courseDelete,
  // coursesGet,
  // courseGet,
  // courseLessonGet,
  // courseLessonsGet,
  // coursePurchase,
  // courseSearch,
  // courseUpdate,
  // userCourses,
  // userDelete,
  // userGet,
  // usersGet,
  // userRegister,
  // userUpdate
  userRouter,
  courseRouter
);
