import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

const connectDb = async () => {
  try {
    await mongoose.connect(DATABASE_URL!);
    console.log("connectDb: Connected to mongo-database: ChillazzLand");
  } catch (error) {
    throw new Error(`connectDb: Error! - ${error}`);
  }
};

export default connectDb;
