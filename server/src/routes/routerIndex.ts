import express from "express";

import userRouter from "./userRoutes";
import courseRouter from "./courseRoutes";

export const routes = express.Router();

routes.use("/users", userRouter);
routes.use("/courses", courseRouter);
