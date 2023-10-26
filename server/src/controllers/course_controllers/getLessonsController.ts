import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { CourseModel } from "../../models/courseModel";

//@desc getLesson
//@route GET /courses/:id/lessons/:lesson_id
//@access Public
export const getLessons = asyncHandler(async (req: Request, res: Response) => {
  try {
    const course = await CourseModel.findById(req.params.id);

    if (!course) {
      res.status(404).json({ message: "Course not found!" });
    }

    res.json(course?.lessons);
  } catch (err) {
    res.status(401);
    throw new Error("Error fetching course!");
  }
});

export default getLessons;
