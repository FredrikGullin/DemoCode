import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { CourseModel } from "../../models/courseModel";
import { CourseInterface } from "../../interfaces/CourseInterface";

//@desc createCourse
//@route POST /admin/courses/create
//@access Admin
export const createCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const course = req.body as CourseInterface;
    try {
      CourseModel.insertMany([course]);
      res.send("Course " + course.course_name + " was registered!");
    } catch (err) {
      throw new Error(`Failed to create course: ${err}`);
    }
  }
);

export default createCourse;
