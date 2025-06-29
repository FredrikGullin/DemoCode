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
exports.adminGetUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = require("../../models/userModel");
exports.adminGetUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const accessToken = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!accessToken) {
            res.status(401);
            throw new Error("Controller: No access token provided!");
        }
        const user = yield userModel_1.UserModel.findById(req.params.id);
        if (!user) {
            res.status(404);
            throw new Error("Controller: User not found!");
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(401);
        throw new Error(`Controller: Error fetching users! - ${error}`);
    }
}));
exports.default = exports.adminGetUser;
//# sourceMappingURL=adminGetUser.js.map