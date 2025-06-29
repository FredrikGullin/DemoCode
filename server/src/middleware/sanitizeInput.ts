import { Request, Response, NextFunction } from "express";
import validator from "validator";

const sanitizeObject = (obj: any) => {
  if (obj && typeof obj === "object") {
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === "string") {
        obj[key] = validator.escape(value.trim());
      }
    }
  }
};

export const sanitizeInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  sanitizeObject(req.body);
  sanitizeObject(req.query);
  sanitizeObject(req.params);
  next();
};
