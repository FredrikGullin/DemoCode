import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/dbConnection";
import { routes } from "./src/routes/routerIndex";
import connectRedis, {
  cleanRevokedList,
  getRevokedList,
  scheduleClean,
} from "./config/redisConnection";

dotenv.config();
connectDb();
connectRedis();
scheduleClean();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());

// App public routes
app.use("/", routes);
app.use("/users/register", routes);
app.use("/users/login", routes);
app.use("/courses", routes);
app.use("courses/:id", routes);
app.use("/courses/search", routes);

// App private routes
app.use("/users/:id", routes);
app.use("/users/logout", routes);
app.use("/users/update/:id", routes);
app.use("/users/current", routes);
app.use("/users/:id/courses", routes);
app.use("/courses/:id/lessons/", routes);
app.use("/courses/:id/purchase", routes);

// App paywall routes
app.use("/courses/:id/lessons/:_id", routes);

// App admin routes
app.use("/admin/users", routes);
app.use("/admin/users/update/:id", routes);
app.use("/admin/users/delete/:id", routes);
app.use("/admin/courses/create", routes);
app.use("/admin/courses/update/:id", routes);
app.use("/admin/courses/delete/:id", routes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
