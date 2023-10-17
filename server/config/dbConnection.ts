import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

const connectDb = async () => {
  try {
    await mongoose.connect(DATABASE_URL!);
    console.log("Connected to database...");
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
};

export default connectDb;
