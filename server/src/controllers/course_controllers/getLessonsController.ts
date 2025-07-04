import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { CourseModel } from "../../models/courseModel";

export const getLessons = asyncHandler(async (req: Request, res: Response) => {
  try {
    const course = await CourseModel.findById(req.params.id);

    if (!course) {
      res.status(404).json({ message: "Controller: Course not found!" });
    }

    res.json(course?.lessons);
  } catch (error) {
    res.status(401);
    throw new Error(`Controller: Error fetching lessons! - ${error}`);
  }
});

export default getLessons;
