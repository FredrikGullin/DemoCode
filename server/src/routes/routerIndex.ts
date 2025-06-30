import express from "express";

import userRouter from "./userRoutes";
import courseRouter from "./courseRoutes";

export const routes = express.Router();

routes.use(userRouter);
routes.use(courseRouter);
