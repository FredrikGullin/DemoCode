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
exports.getLessons = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const courseModel_1 = require("../../models/courseModel");
exports.getLessons = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield courseModel_1.CourseModel.findById(req.params.id);
        if (!course) {
            res.status(404).json({ message: "Controller: Course not found!" });
        }
        res.json(course === null || course === void 0 ? void 0 : course.lessons);
    }
    catch (error) {
        res.status(401);
        throw new Error(`Controller: Error fetching lessons! - ${error}`);
    }
}));
exports.default = exports.getLessons;
//# sourceMappingURL=getLessonsController.js.map