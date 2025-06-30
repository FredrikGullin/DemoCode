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
exports.auth = exports.SECRET_KEY = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const redisConnection_1 = require("../../config/redisConnection");
dotenv_1.default.config();
exports.SECRET_KEY = process.env.JWT_KEY;
exports.auth = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            throw new Error("auth: Missing access token!");
        }
        const isRevoked = yield redisConnection_1.redisClient.sIsMember("revokedList", token);
        if (!isRevoked) {
            const decoded = jsonwebtoken_1.default.verify(token, exports.SECRET_KEY);
            req.token = decoded;
            next();
        }
        else {
            res.status(401);
            throw new Error("auth: Token is revoked!");
        }
    }
    catch (error) {
        res.status(401);
        throw new Error(`auth: User must be authenticated! - ${error}`);
    }
}));
exports.default = exports.auth;
//# sourceMappingURL=auth.js.map