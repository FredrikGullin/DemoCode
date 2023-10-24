import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/dbConnection";
import { routes } from "./src/routes/routerIndex";
import connectRedis, {
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

app.use("/", routes);
app.use("/users", routes);
app.use("/users/:id", routes);
app.use("/users/register", routes);
app.use("/users/login", routes);
app.use("/user/logout", routes);
app.use("/users/update/:id", routes);
app.use("/users/delete/:id", routes);
app.use("/users/current", routes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
