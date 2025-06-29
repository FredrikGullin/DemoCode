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
exports.getOwnedCourses = exports.SECRET_KEY = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const courseModel_1 = require("../../models/courseModel");
dotenv_1.default.config();
exports.SECRET_KEY = process.env.JWT_KEY;
exports.getOwnedCourses = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            throw new Error("Controller: Missing access token!");
        }
        const decoded = jsonwebtoken_1.default.verify(token, exports.SECRET_KEY);
        const ownedCourses = decoded.owned_courses || [];
        if (ownedCourses != "" || []) {
            let courses = [];
            for (const course of ownedCourses) {
                const courseDocument = yield courseModel_1.CourseModel.findById(course);
                if (courseDocument) {
                    courses.push(courseDocument);
                }
            }
            if (courses.length === 0) {
                res
                    .status(404)
                    .json({ message: "Controller: You don't own any courses yet!" });
            }
            res.status(200).json({ courses });
        }
        else {
            res
                .status(404)
                .json({ message: "Controller: You don't own any courses yet!" });
        }
    }
    catch (error) {
        res.status(500);
        throw new Error(`Controller: Error fetching courses! - ${error}`);
    }
}));
exports.default = exports.getOwnedCourses;
//# sourceMappingURL=getUserCoursesController.js.map