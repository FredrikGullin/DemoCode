import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { CourseModel } from "../../models/courseModel";

//@desc getCourses
//@route GET /courses
//@access Public
export const getCourses = asyncHandler(
  async (req: Request, res: Response, next) => {
    try {
      const courses = await CourseModel.find();
      if (courses.length === 0) {
        res.send("Course-database is empty!");
      }
      res.json(courses);
    } catch (err) {
      res.status(400);
      throw new Error(`${err}`);
    }
  }
);

export default getCourses;
