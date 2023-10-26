import mongoose, { Document, Schema, model } from "mongoose";
import { CourseInterface } from "../interfaces/CourseInterface";

const CourseSchema = new Schema<CourseInterface>(
  {
    course_id: String,
    course_name: String,
    course_info: String,
    course_picture: String,
    lessons: [
      {
        _id: String,
        lesson_title: String,
        description: String,
        video_url: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const CourseModel = model("Course", CourseSchema);
