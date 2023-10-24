import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { redisClient } from "../../config/redisConnection";
import { AuthRequest } from "../interfaces/AuthRequestInterface";

dotenv.config();

export const SECRET_KEY: Secret = process.env.JWT_KEY as Secret;

export const auth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        throw new Error("Missing access token!");
      }

      const isRevoked = await redisClient.sIsMember("revokedList", token);

      if (!isRevoked) {
        const decoded = jwt.verify(token, SECRET_KEY);
        (req as unknown as AuthRequest).token = decoded;

        next();
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

export default auth;
