import mongoose, { Document, Schema, model } from "mongoose";
import { CourseInterface } from "../interfaces/CourseInterface";

const CourseSchema = new Schema<CourseInterface>(
  {
    course_id: Number,
    course_name: String,
    course_info: String,
    course_picture: String,
    lessons: [
      {
        lesson_id: Number,
        lesson_title: String,
        lesson_description: {
          description_id: Number,
          text: String,
        },
        lesson_video: {
          video_id: Number,
          video_url: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const CourseModel = model("Course", CourseSchema);
