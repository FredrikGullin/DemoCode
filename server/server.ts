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
import { sanitizeInput } from "./src/middleware/sanitizeInput";

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

app.use(sanitizeInput);
app.use(routes);
app.use("*", (req, res) => {
  res.status(404).json({ message: "🚫 Route not found" });
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
