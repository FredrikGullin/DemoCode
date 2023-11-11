import express, { Request, Response, response } from "express";
import jwt from "jsonwebtoken";
import redis from "redis";
import { redisClient } from "../../../config/redisConnection";

export const storeRevokedToken = async (token: string) => {
  try {
    await redisClient.SADD("revokedList", token);
    console.log("Token added to revoked-list!");
  } catch (error) {
    throw new Error(`Controller: Error connecting to REDIS! - ${error}`);
  }
};

export const userLogout = async (req: Request, res: Response) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (token) {
      await storeRevokedToken(token);
      res.send("Token added to revoked-list!");
    } else {
      res.status(400).json({ message: "Controller: Token not provided!" });
    }
  } catch (error) {
    throw new Error(`Controller: Error logging out! - ${error}`);
  }
};

export default userLogout;
