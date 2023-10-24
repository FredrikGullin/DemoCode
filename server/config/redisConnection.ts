import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

export const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || "6379", 10),
  },
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Connected to redis-database: Chillazz-Redis-free-db");
  } catch (err) {
    throw new Error("Failed connecting to REDIS!");
  }
};

export const storeRevokedToken = async (token: string) => {
  try {
    await redisClient.SADD("revokedList", token);
    console.log("Token added to revoked-list!");
  } catch (err) {
    throw new Error("Failed connecting to REDIS!");
  }
};

export const cleanRevokedList = async () => {
  const cleaned = await redisClient.del("revokedList");

  if (!cleaned) {
    throw new Error("Failed cleaning revoked-list!");
  } else {
    console.log("Revoked-list cleaned!");
  }
};

export const scheduleClean = () => {
  setInterval(
    () => {
      cleanRevokedList();
    },
    24 * 60 * 60 * 1000
  );
};

export const getRevokedList = async () => {
  const revokedList = await redisClient.sMembers("revokedList");
  console.log(revokedList);
};

export default connectRedis;
