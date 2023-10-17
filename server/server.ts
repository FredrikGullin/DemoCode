import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/dbConnection";

dotenv.config();
connectDb();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Home");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
