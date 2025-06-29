import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Internal server error!",
  });
};
