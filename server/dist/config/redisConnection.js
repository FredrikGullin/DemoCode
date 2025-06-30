"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRevokedList = exports.scheduleClean = exports.cleanRevokedList = exports.storeRevokedToken = exports.connectRedis = exports.redisClient = void 0;
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.redisClient = (0, redis_1.createClient)({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || "6379", 10),
    },
});
const connectRedis = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.redisClient.connect();
        console.log("connectRedis: Connected to redis-database: Chillazz-Redis-free-db");
    }
    catch (error) {
        throw new Error(`connectRedis: Error connecting to REDIS! - ${error}`);
    }
});
exports.connectRedis = connectRedis;
const storeRevokedToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.redisClient.SADD("revokedList", token);
        console.log("Revoked: Token added to revoked-list!");
    }
    catch (error) {
        throw new Error(`Revoked: Revoked store error! - ${error}`);
    }
});
exports.storeRevokedToken = storeRevokedToken;
const cleanRevokedList = () => __awaiter(void 0, void 0, void 0, function* () {
    const revokedList = yield exports.redisClient.sMembers("revokedList");
    try {
        if (revokedList.length > 0) {
            const cleaned = yield exports.redisClient.del("revokedList");
            if (!cleaned) {
                throw new Error("Revoked: Error cleaning revoked-list!");
            }
            else {
                console.log("Revoked: Revoked-list cleaned!");
            }
        }
        else {
            console.log("Revoked: Revoke-list is empty!");
        }
    }
    catch (error) {
        throw new Error(`Revoked: Error cleaning revoked list! - ${error}`);
    }
});
exports.cleanRevokedList = cleanRevokedList;
/* Schemalagd tömning av revoked list */
const scheduleClean = () => {
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);
    const initialDelay = nextMidnight.getTime() - now.getTime();
    setInterval(() => {
        (0, exports.cleanRevokedList)();
    }, 24 * 60 * 60 * 1000);
    (0, exports.cleanRevokedList)();
    setTimeout(() => {
        (0, exports.cleanRevokedList)();
        setInterval(() => {
            (0, exports.cleanRevokedList)();
        }, 24 * 60 * 60 * 1000);
    }, initialDelay);
};
exports.scheduleClean = scheduleClean;
const getRevokedList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const revokedList = yield exports.redisClient.sMembers("revokedList");
        console.log("Revoked: ", revokedList);
    }
    catch (error) {
        throw new Error(`Revoked: Error fetching revoked list! - ${error}`);
    }
});
exports.getRevokedList = getRevokedList;
exports.default = exports.connectRedis;
//# sourceMappingURL=redisConnection.js.map