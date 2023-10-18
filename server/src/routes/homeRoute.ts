import { Router, Request, Response } from "express";

export const home = Router();

home.get("/", (req: Request, res: Response) => {
  res.send("Home");
});
