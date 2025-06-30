"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const adminLock_1 = __importDefault(require("../middleware/adminLock"));
const deleteUserController_1 = __importDefault(require("../controllers/user_controllers/deleteUserController"));
const getUserController_1 = __importDefault(require("../controllers/user_controllers/getUserController"));
const registerUserController_1 = __importDefault(require("../controllers/user_controllers/registerUserController"));
const updateUserController_1 = __importDefault(require("../controllers/user_controllers/updateUserController"));
const userLoginController_1 = __importDefault(require("../controllers/user_controllers/userLoginController"));
const userLogoutController_1 = __importDefault(require("../controllers/user_controllers/userLogoutController"));
const getUserCoursesController_1 = __importDefault(require("../controllers/user_controllers/getUserCoursesController"));
const adminGetUsers_1 = __importDefault(require("../controllers/user_controllers/adminGetUsers"));
const adminGetUser_1 = __importDefault(require("../controllers/user_controllers/adminGetUser"));
const adminUpdateUser_1 = __importDefault(require("../controllers/user_controllers/adminUpdateUser"));
const adminDeleteUser_1 = __importDefault(require("../controllers/user_controllers/adminDeleteUser"));
const userRouter = (0, express_1.Router)();
//@Access Public
userRouter.post("/users/register", registerUserController_1.default);
userRouter.post("/users/login", userLoginController_1.default);
//@Access Private
userRouter.post("/users/logout", auth_1.default, userLogoutController_1.default);
userRouter.get("/users/:id", auth_1.default, getUserController_1.default);
userRouter.put("/users/update/:id", auth_1.default, updateUserController_1.default);
userRouter.get("/users/:id/courses", auth_1.default, getUserCoursesController_1.default);
userRouter.delete("/users/delete/:id", auth_1.default, deleteUserController_1.default);
//@Access Admin
userRouter.get("/admin/users", adminLock_1.default, adminGetUsers_1.default);
userRouter.get("/admin/users/:id", adminLock_1.default, adminGetUser_1.default);
userRouter.put("/admin/users/update/:id", adminLock_1.default, adminUpdateUser_1.default);
userRouter.delete("/admin/users/delete/:id", adminLock_1.default, adminDeleteUser_1.default);
exports.default = userRouter;
//# sourceMappingURL=userRoutes.js.map