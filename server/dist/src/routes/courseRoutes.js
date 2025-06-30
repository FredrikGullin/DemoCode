"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const adminLock_1 = __importDefault(require("../middleware/adminLock"));
const paywall_1 = __importDefault(require("../middleware/paywall"));
const getCoursesController_1 = __importDefault(require("../controllers/course_controllers/getCoursesController"));
const getCourseController_1 = __importDefault(require("../controllers/course_controllers/getCourseController"));
const getLessonsController_1 = __importDefault(require("../controllers/course_controllers/getLessonsController"));
const getLessonController_1 = __importDefault(require("../controllers/course_controllers/getLessonController"));
const searchCourseController_1 = require("../controllers/course_controllers/searchCourseController");
const purchaseCourseController_1 = require("../controllers/course_controllers/purchaseCourseController");
const adminCreateCourseController_1 = __importDefault(require("../controllers/course_controllers/adminCreateCourseController"));
const adminUpdateCourseController_1 = __importDefault(require("../controllers/course_controllers/adminUpdateCourseController"));
const adminDeleteCourseController_1 = __importDefault(require("../controllers/course_controllers/adminDeleteCourseController"));
const courseRouter = (0, express_1.Router)();
//@Access Public
courseRouter.get("/courses/:id", getCourseController_1.default);
courseRouter.get("/courses", getCoursesController_1.default);
courseRouter.post("/courses/search", searchCourseController_1.searchCourse);
//@Access Private
courseRouter.put("/courses/:id/purchase", auth_1.default, purchaseCourseController_1.purchaseCourse);
//@Access Paywall
courseRouter.get("/courses/:id/lessons", auth_1.default, paywall_1.default, getLessonsController_1.default);
courseRouter.get("/courses/:id/lessons/:_id", auth_1.default, paywall_1.default, getLessonController_1.default);
//@Access Admin
courseRouter.post("/admin/courses/create", adminLock_1.default, adminCreateCourseController_1.default);
courseRouter.put("/admin/courses/update/:id", adminLock_1.default, adminUpdateCourseController_1.default);
courseRouter.delete("/admin/courses/delete/:id", adminLock_1.default, adminDeleteCourseController_1.default);
exports.default = courseRouter;
//# sourceMappingURL=courseRoutes.js.map