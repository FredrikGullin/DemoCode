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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogout = exports.storeRevokedToken = void 0;
const redisConnection_1 = require("../../../config/redisConnection");
const storeRevokedToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisConnection_1.redisClient.SADD("revokedList", token);
        console.log("Token added to revoked-list!");
    }
    catch (error) {
        throw new Error(`Controller: Error connecting to REDIS! - ${error}`);
    }
});
exports.storeRevokedToken = storeRevokedToken;
const userLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (token) {
            yield (0, exports.storeRevokedToken)(token);
            res.send("Token added to revoked-list!");
        }
        else {
            res.status(400).json({ message: "Controller: Token not provided!" });
        }
    }
    catch (error) {
        throw new Error(`Controller: Error logging out! - ${error}`);
    }
});
exports.userLogout = userLogout;
exports.default = exports.userLogout;
//# sourceMappingURL=userLogoutController.js.map