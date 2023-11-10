import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { CourseModel } from "../../models/courseModel";

export const getCourse = asyncHandler(async (req: Request, res: Response) => {
  try {
    const course = await CourseModel.findById(req.params.id);
    if (!course) {
      res.status(404);
      throw new Error("Course not found!");
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(401);
    throw new Error("Error fetching course!");
  }
});

export default getCourse;
