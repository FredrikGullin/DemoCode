import { Router } from "express";
import auth from "../middleware/auth";
import adminLock from "../middleware/adminLock";
import paywall from "../middleware/paywall";
import getCourses from "../controllers/course_controllers/getCoursesController";
import getCourse from "../controllers/course_controllers/getCourseController";
import getLessons from "../controllers/course_controllers/getLessonsController";
import getLesson from "../controllers/course_controllers/getLessonController";
import { searchCourse } from "../controllers/course_controllers/searchCourseController";
import { purchaseCourse } from "../controllers/course_controllers/purchaseCourseController";
import adminCreateCourse from "../controllers/course_controllers/adminCreateCourseController";
import adminUpdateCourse from "../controllers/course_controllers/adminUpdateCourseController";
import adminDeleteCourse from "../controllers/course_controllers/adminDeleteCourseController";

const courseRouter = Router();

//@Access Public
courseRouter.get("/courses/:id", getCourse);
courseRouter.get("/courses", getCourses);
courseRouter.post("/courses/search", searchCourse);

//@Access Private
courseRouter.put("/courses/:id/purchase", auth, purchaseCourse);

//@Access Paywall
courseRouter.get("/courses/:id/lessons", auth, paywall, getLessons);
courseRouter.get("/courses/:id/lessons/:_id", auth, paywall, getLesson);

//@Access Admin
courseRouter.post("/admin/courses/create", adminLock, adminCreateCourse);
courseRouter.put("/admin/courses/update/:id", adminLock, adminUpdateCourse);
courseRouter.delete("/admin/courses/delete/:id", adminLock, adminDeleteCourse);

export default courseRouter;
