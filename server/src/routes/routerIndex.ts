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
import {
  courseCreate,
  courseDelete,
  courseGet,
  courseLessonGet,
  courseLessonsGet,
  courseUpdate,
  coursesGet,
} from "./courseRoutes";
import getLesson from "../controllers/course_controllers/getLessonsController";

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
  logoutUser,
  courseCreate,
  coursesGet,
  courseGet,
  courseUpdate,
  courseDelete,
  courseLessonsGet,
  courseLessonGet
);

// routes.use(userRoutes);
