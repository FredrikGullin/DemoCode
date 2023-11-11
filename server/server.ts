import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from "./src/routes/routerIndex";
import { errorHandler } from "./src/middleware/errorHandler";
import connectDb from "./config/dbConnection";
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
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
