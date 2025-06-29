import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { redisClient } from "../../config/redisConnection";

dotenv.config();

export const SECRET_KEY: Secret = process.env.JWT_KEY as Secret;

export const adminLock = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        throw new Error("adminLock: Missing access token!");
      }

      const isRevoked = await redisClient.sIsMember("revokedList", token);

      if (!isRevoked) {
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

        if (decoded.role === "admin") {
          next();
        } else {
          res
            .status(403)
            .json({ message: "adminLock: Access denied! User is not admin!" });
        }
      } else {
        res.status(401);
        throw new Error("adminLock: Token is revoked!");
      }
    } catch (error) {
      res.status(401);
      throw new Error(`adminLock: User must be authenticated! - ${error}`);
    }
  }
);

export default adminLock;
