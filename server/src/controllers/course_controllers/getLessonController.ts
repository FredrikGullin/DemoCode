import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { CourseModel } from "../../models/courseModel";

export const getLesson = asyncHandler(async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;
    const lessonId = req.params._id;

    console.log({
      courseId,
      lessonId,
    });

    const course = await CourseModel.findById(req.params.id);
    if (!course) {
      res.status(404);
      throw new Error("Controller: Course not found!");
    }

    const lesson = course.lessons.find(
      (lesson) => lesson._id.toString() === lessonId
    );

    if (!lesson) {
      res.status(404).json({ message: "Controller: Lesson not found!" });
    }

    res.json(lesson);
  } catch (error) {
    res.status(401);
    throw new Error(`Controller: Error fetching lesson! - ${error}`);
  }
});

export default getLesson;
