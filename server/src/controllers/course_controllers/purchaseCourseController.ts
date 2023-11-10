import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../../models/userModel";

dotenv.config();

const SECRET_KEY: Secret = process.env.JWT_KEY as Secret;

export const purchaseCourse = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        throw new Error("Missing access token!");
      }

      const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

      const user = await UserModel.findById(decoded.userId);

      if (!user) {
        res.status(404).json({ message: "User not found!" });
      }

      const course_id = req.params.id;
      const ownedCourses = decoded.owned_courses || [];

      let isOwned = false;

      for (let i = 0; i < ownedCourses.length; i++) {
        const course = ownedCourses[i];
        if (course === course_id) {
          isOwned = true;
          res.status(400).json({
            message: "Purchase cancelled! You already own this course!",
          });
          break;
        }
      }

      if (!isOwned) {
        ownedCourses.push(course_id);
        user!.owned_courses = ownedCourses;
        await user?.save();

        const updatedToken = jwt.sign(
          {
            userId: decoded.userId,
            username: decoded.username,
            email: decoded.email,
            role: decoded.role,
            owned_courses: user?.owned_courses,
          },
          SECRET_KEY,
          { expiresIn: "2h" }
        );

        res.status(200).json({
          message: "Course purchased successfully!",
          accessToken: updatedToken,
          userId: decoded.userId,
          username: decoded.username,
          email: decoded.email,
          role: decoded.role,
          owned_courses: user?.owned_courses,
        });
      }
    } catch (err) {
      res.status(500).json("Server error!");
    }
  }
);

export default purchaseCourse;
