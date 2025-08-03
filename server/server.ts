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

const allowedOrigins = [
  "http://localhost:5173", // dev
  "https://appeggio-frontend.netlify.app", // prod
];

// ✅ CORS + dynamic origin
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Hantera preflight-requests
app.options("*", cors());

app.use(sanitizeInput);
app.use(routes);

// 404 fallback
app.use("*", (req, res) => {
  res.status(404).json({ message: "🚫 Route not found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  console.log("Trigger deploy...");
});
