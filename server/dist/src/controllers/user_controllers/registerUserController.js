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
exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = require("../../models/userModel");
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(user.password, salt);
    user.password = hashedPassword;
    user.role = "student";
    user.owned_courses = [];
    try {
        const existingUser = yield userModel_1.UserModel.findOne({ email: user.email });
        if (existingUser) {
            res.status(400);
            throw new Error("Controller: Email already exists!");
        }
        userModel_1.UserModel.insertMany([user]);
        res.send("User " + user.username + " was registered!");
    }
    catch (error) {
        throw new Error(`Controller: Error registering user: ${error}`);
    }
}));
exports.default = exports.registerUser;
//# sourceMappingURL=registerUserController.js.map