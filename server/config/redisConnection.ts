import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

export const connectRedis = async () => {
  try {
    redisClient.on("error", (err) =>
      console.error("❌ Redis Client Error:", err)
    );
    await redisClient.connect();
    console.log("✅ connectRedis: Connected to Redis via Upstash");
  } catch (error) {
    console.error("❌ connectRedis: Error connecting to REDIS!", error);
    throw error;
  }
};

export const storeRevokedToken = async (token: string) => {
  try {
    await redisClient.SADD("revokedList", token);
    console.log("Revoked: Token added to revoked-list!");
  } catch (error) {
    throw new Error(`Revoked: Revoked store error! - ${error}`);
  }
};

export const cleanRevokedList = async () => {
  const revokedList = await redisClient.sMembers("revokedList");
  try {
    if (revokedList.length > 0) {
      const cleaned = await redisClient.del("revokedList");

      if (!cleaned) {
        throw new Error("Revoked: Error cleaning revoked-list!");
      } else {
        console.log("Revoked: Revoked-list cleaned!");
      }
    } else {
      console.log("Revoked: Revoke-list is empty!");
    }
  } catch (error) {
    throw new Error(`Revoked: Error cleaning revoked list! - ${error}`);
  }
};

/* Schemalagd tömning av revoked list */
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
  try {
    const revokedList = await redisClient.sMembers("revokedList");
    console.log("Revoked: ", revokedList);
  } catch (error) {
    throw new Error(`Revoked: Error fetching revoked list! - ${error}`);
  }
};

export default connectRedis;
