import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { CourseModel } from "../../models/courseModel";
import { CourseInterface } from "../../interfaces/CourseInterface";

export const adminCreateCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const course = req.body as CourseInterface;
    try {
      CourseModel.insertMany([course]);
      res.status(200);
      res.send("Controller: Course " + course.course_name + " was registered!");
    } catch (error) {
      throw new Error(`Controller: Failed to create course! - ${error}`);
    }
  }
);

export default adminCreateCourse;
