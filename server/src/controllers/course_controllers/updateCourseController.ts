import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { CourseModel } from "../../models/courseModel";

//@desc updateCourse
//@route PUT admin/courses/update/:id
//@access Admin
export const updateCourse = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const course = await CourseModel.findById(req.params.id);
      if (!course) {
        res.status(404);
        throw new Error("Course not found!");
      }
      course.course_name = req.body.course_name;
      course.course_info = req.body.course_info;
      course.course_picture = req.body.course_picture;

      const updatedCourse = await course.save();
      res.status(200).json(updatedCourse);
    } catch (err) {
      res.status(500).json("Server error!");
    }
  }
);

export default updateCourse;
