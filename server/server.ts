import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/dbConnection";
import { routes } from "./src/routes/routerIndex";

dotenv.config();
connectDb();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", routes);
app.use("/users", routes);
app.use("/users/register", routes);
app.use("/users/login", routes);
app.use("/users/verify", routes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
