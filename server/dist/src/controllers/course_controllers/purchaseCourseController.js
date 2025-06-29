"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseCourse = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const userModel_1 = require("../../models/userModel");
dotenv_1.default.config();
const SECRET_KEY = process.env.JWT_KEY;
exports.purchaseCourse = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            throw new Error("Controller: Missing access token!");
        }
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        const user = yield userModel_1.UserModel.findById(decoded.userId);
        if (!user) {
            res.status(404).json({ message: "Controller: User not found!" });
        }
        const course_id = req.params.id;
        const ownedCourses = decoded.owned_courses || [];
        let isOwned = false;
        for (let i = 0; i < ownedCourses.length; i++) {
            const course = ownedCourses[i];
            if (course === course_id) {
                isOwned = true;
                res.status(400).json({
                    message: "Purchase cancelled! You already own this course!",
                });
                break;
            }
        }
        if (!isOwned) {
            ownedCourses.push(course_id);
            user.owned_courses = ownedCourses;
            yield (user === null || user === void 0 ? void 0 : user.save());
            const updatedToken = jsonwebtoken_1.default.sign({
                userId: decoded.userId,
                username: decoded.username,
                email: decoded.email,
                role: decoded.role,
                owned_courses: user === null || user === void 0 ? void 0 : user.owned_courses,
            }, SECRET_KEY, { expiresIn: "2h" });
            res.status(200).json({
                message: "Course purchased successfully!",
                accessToken: updatedToken,
                userId: decoded.userId,
                username: decoded.username,
                email: decoded.email,
                role: decoded.role,
                owned_courses: user === null || user === void 0 ? void 0 : user.owned_courses,
            });
        }
    }
    catch (error) {
        res.status(500).json(`Controller: Error purchasing course! - ${error}`);
    }
}));
exports.default = exports.purchaseCourse;
//# sourceMappingURL=purchaseCourseController.js.map