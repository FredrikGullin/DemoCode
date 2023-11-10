import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { CourseModel } from "../../models/courseModel";

export const adminDeleteCourse = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const deletedCourse = await CourseModel.findByIdAndDelete(req.params.id);
      if (!deletedCourse) {
        res.status(404);
        throw new Error("Course not found!");
      }
      res.status(200).send("Course successfully deleted!").json(deletedCourse);
    } catch (err) {
      res.status(500);
      throw new Error("Server error!");
    }
  }
);

export default adminDeleteCourse;
