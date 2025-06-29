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
exports.deleteUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../../models/userModel");
const SECRET_KEY = process.env.JWT_KEY;
exports.deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const accessToken = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!accessToken) {
            throw new Error("Controller: Missing access token!");
        }
        const decoded = jsonwebtoken_1.default.verify(accessToken, SECRET_KEY);
        if (decoded.userId !== id) {
            throw new Error("Controller: Unauthorized action!");
        }
        const deletedUser = yield userModel_1.UserModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            res.status(404);
            throw new Error("Controller: User not found!");
        }
        res.status(200).send("User successfully deleted!").json(deletedUser);
    }
    catch (error) {
        res.status(500);
        throw new Error(`Controller: Error deleting user - ${error}`);
    }
}));
exports.default = exports.deleteUser;
//# sourceMappingURL=deleteUserController.js.map