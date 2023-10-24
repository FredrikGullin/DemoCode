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
  const revokedList = await redisClient.sMembers("revokedList");

  if (revokedList.length > 0) {
    const cleaned = await redisClient.del("revokedList");

    if (!cleaned) {
      throw new Error("Failed cleaning revoked-list!");
    } else {
      console.log("Revoked-list cleaned!");
    }
  } else {
    console.log("Revoke-list is already empty!");
  }
};

export const scheduleClean = () => {
  const now = new Date();
  const nextMidnight = new Date(now);
  nextMidnight.setHours(24, 0, 0, 0);

  const initialDelay = nextMidnight.getTime() - now.getTime();

  setInterval(
    () => {
      cleanRevokedList();
    },
    24 * 60 * 60 * 1000
  );

  cleanRevokedList();

  setTimeout(() => {
    cleanRevokedList();
    setInterval(
      () => {
        cleanRevokedList();
      },
      24 * 60 * 60 * 1000
    );
  }, initialDelay);
};

export const getRevokedList = async () => {
  const revokedList = await redisClient.sMembers("revokedList");
  console.log(revokedList);
};

export default connectRedis;
