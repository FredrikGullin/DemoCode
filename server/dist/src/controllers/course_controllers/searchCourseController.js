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
exports.searchCourse = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const courseModel_1 = require("../../models/courseModel");
exports.searchCourse = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = req.body;
    if (!search) {
        res.status(400).json({ message: "Controller: Missing search query!" });
    }
    try {
        const results = yield courseModel_1.CourseModel.find({
            $or: [
                { course_name: { $regex: search, $options: "i" } },
                { course_slogan: { $regex: search, $options: "i" } },
                { course_info: { $regex: search, $options: "i" } },
            ],
        });
        if (results.length === 0) {
            res.status(404).json({ message: "Controller: No matches found!" });
        }
        else {
            res.json(results);
        }
    }
    catch (error) {
        res.status(500);
        throw new Error(`Controller: Search error! - ${error}`);
    }
}));
exports.default = exports.searchCourse;
//# sourceMappingURL=searchCourseController.js.map