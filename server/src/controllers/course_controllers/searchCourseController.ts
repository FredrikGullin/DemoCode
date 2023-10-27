import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { CourseModel } from "../../models/courseModel";

export const searchCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const { query } = req.query as { query: string };

    if (!query) {
      res.status(400).json({ message: "Please provide a search query!" });
      return;
    }

    try {
      const results = await CourseModel.find({
        $or: [
          { course_name: { $regex: query, $options: "i" } },
          { course_info: { $regex: query, $options: "i" } },
        ],
      });

      if (results.length === 0) {
        res.status(404).json({ message: "No matches found!" });
      } else {
        res.json(results);
      }
    } catch (err) {
      res.status(500).json({ error: "Search query failed!" });
    }
  }
);

export default searchCourse;
