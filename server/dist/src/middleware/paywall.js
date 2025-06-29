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
exports.paywall = exports.SECRET_KEY = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const redisConnection_1 = require("../../config/redisConnection");
const userModel_1 = require("../models/userModel");
dotenv_1.default.config();
exports.SECRET_KEY = process.env.JWT_KEY;
exports.paywall = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            res.status(401).json({ message: "paywall: Missing access token!" });
            return;
        }
        const isRevoked = yield redisConnection_1.redisClient.sIsMember("revokedList", token);
        if (isRevoked) {
            res.status(401).json({ message: "paywall: Token is revoked!" });
            return;
        }
        if (!isRevoked) {
            const decoded = jsonwebtoken_1.default.verify(token, exports.SECRET_KEY);
            if (decoded.role === "admin") {
                next();
                return;
            }
            const user = yield userModel_1.UserModel.findById(decoded.userId);
            if (!user) {
                res.status(404).json({ message: "paywall: User not found!" });
                return;
            }
            const ownedCourses = decoded.owned_courses || [];
            const courseId = req.params.id;
            let isOwned = false;
            for (const course of ownedCourses) {
                if (course === courseId) {
                    isOwned = true;
                    break;
                }
            }
            if (isOwned) {
                next();
            }
            else {
                res.status(403).json({
                    message: "paywall: Access denied. You do not own this course!",
                });
            }
        }
        else {
            res.status(401);
            throw new Error("paywall: Token is revoked!");
        }
    }
    catch (error) {
        res.status(401);
        throw new Error(`paywall: User must be authenticated! - ${error}`);
    }
}));
exports.default = exports.paywall;
//# sourceMappingURL=paywall.js.map