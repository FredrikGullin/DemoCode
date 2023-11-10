import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { redisClient } from "../../config/redisConnection";
import { UserModel } from "../models/userModel";

dotenv.config();

export const SECRET_KEY: Secret = process.env.JWT_KEY as Secret;

export const paywall = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        res.status(401).json({ message: "Missing access token!" });
        return;
      }

      const isRevoked = await redisClient.sIsMember("revokedList", token);
      if (isRevoked) {
        res.status(401).json({ message: "Token is revoked!" });
        return;
      }

      if (!isRevoked) {
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

        if (decoded.role === "admin") {
          next();
          return;
        }

        const user = await UserModel.findById(decoded.userId);

        if (!user) {
          res.status(404).json({ message: "User not found!" });
          return;
        }

        const ownedCourses = decoded.owned_courses || [];
        const courseId = req.params.id;

        let isOwned = false;

        for (const course of ownedCourses) {
          if (course === courseId) {
            isOwned = true;
            break;
          }
        }

        if (isOwned) {
          next();
        } else {
          res
            .status(403)
            .json({ message: "Access denied. You do not own this course!" });
        }
      } else {
        res.status(401);
        throw new Error("Token is revoked!");
      }
    } catch (err) {
      res.status(401);
      throw new Error("User must be authenticated!");
    }
  }
);

export default paywall;
