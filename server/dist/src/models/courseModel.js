"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModel = void 0;
const mongoose_1 = require("mongoose");
const CourseSchema = new mongoose_1.Schema({
    course_id: String,
    course_name: String,
    course_slogan: String,
    course_info: String,
    course_price: String,
    course_picture: String,
    lessons: [
        {
            _id: String,
            lesson_title: String,
            description: String,
            video_url: String,
        },
    ],
}, {
    timestamps: true,
});
exports.CourseModel = (0, mongoose_1.model)("Course", CourseSchema);
//# sourceMappingURL=courseModel.js.map