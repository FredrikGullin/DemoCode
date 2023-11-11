import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { CourseModel } from "../../models/courseModel";

export const getCourses = asyncHandler(
  async (req: Request, res: Response, next) => {
    try {
      const courses = await CourseModel.find();
      if (courses.length === 0) {
        res.send("Controller: Course-database is empty!");
      }
      res.json(courses);
    } catch (error) {
      res.status(400);
      throw new Error(`Controller: Error fetching courses! - ${error}`);
    }
  }
);

export default getCourses;
