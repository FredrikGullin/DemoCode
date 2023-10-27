import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { CourseModel } from "../../models/courseModel";
import { CourseInterface } from "../../interfaces/CourseInterface";

dotenv.config();

export const SECRET_KEY: Secret = process.env.JWT_KEY as Secret;

export const getOwnedCourses = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        throw new Error("Missing access token!");
      }

      const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

      const ownedCourses = decoded.owned_courses || [];

      if (ownedCourses != "" || []) {
        let courses: CourseInterface[] = [];

        for (const course of ownedCourses) {
          const courseDocument = await CourseModel.findById(course);
          if (courseDocument) {
            courses.push(courseDocument);
          }
        }

        if (courses.length === 0) {
          res.status(404).json({ message: "You don't own any courses yet!" });
        }

        res.status(200).json({ courses });
      } else {
        res.status(404).json({ message: "You don't own any courses yet!" });
      }
    } catch (err) {
      res.status(500).json({ error: "Server error!" });
    }
  }
);

export default getOwnedCourses;
