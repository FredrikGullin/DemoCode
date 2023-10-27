import { Router } from "express";
import auth from "../middleware/auth";
import adminLock from "../middleware/adminLock";
import paywall from "../middleware/paywall";
import createCourse from "../controllers/course_controllers/createCourseController";
import getCourses from "../controllers/course_controllers/getCoursesController";
import getCourse from "../controllers/course_controllers/getCourseController";
import updateCourse from "../controllers/course_controllers/updateCourseController";
import deleteCourse from "../controllers/course_controllers/deleteCourseController";
import getLessons from "../controllers/course_controllers/getLessonsController";
import getLesson from "../controllers/course_controllers/getLessonController";
import { searchCourse } from "../controllers/course_controllers/searchCourseController";
import { purchaseCourse } from "../controllers/course_controllers/purchaseCourseController";

export const courseCreate = Router();
export const courseDelete = Router();
export const courseGet = Router();
export const coursesGet = Router();
export const courseLessonsGet = Router();
export const courseLessonGet = Router();
export const coursePurchase = Router();
export const courseSearch = Router();
export const courseUpdate = Router();

//@Access Public
courseGet.get("/courses/:id", getCourse);
coursesGet.get("/courses", getCourses);
courseSearch.post("/courses/search", searchCourse);

//@Access Private
courseLessonsGet.get("/courses/:id/lessons", auth, getLessons);
coursePurchase.put("/courses/:id/purchase", auth, purchaseCourse);

//@Access Paywall
courseLessonGet.get("/courses/:id/lessons/:_id", paywall, getLesson);

//@Access Admin
courseCreate.post("/admin/courses/create", adminLock, createCourse);
courseDelete.delete("/admin/courses/delete/:id", adminLock, deleteCourse);
courseUpdate.put("/admin/courses/update/:id", adminLock, updateCourse);
