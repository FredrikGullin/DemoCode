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
exports.userLogin = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../../models/userModel");
const SECRET_KEY = process.env.JWT_KEY;
exports.userLogin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.UserModel.findOne({ email: req.body.email });
        if (user == null) {
            res
                .status(401)
                .json({ message: "Controller: Invalid email or password" });
        }
        else {
            const valid = yield bcrypt_1.default.compare(req.body.password, user.password);
            if (valid) {
                const validUser = {
                    userId: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    owned_courses: user.owned_courses,
                };
                const accessToken = jsonwebtoken_1.default.sign(validUser, SECRET_KEY, {
                    expiresIn: "2h",
                });
                res.json({
                    accessToken: accessToken,
                    userId: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    owned_courses: user.owned_courses,
                });
            }
            else {
                res
                    .status(401)
                    .json({ message: "Controller: Invalid email or password" });
            }
        }
    }
    catch (error) {
        res.status(400);
        throw new Error(`Controller: Error logging in! - ${error}`);
    }
}));
exports.default = exports.userLogin;
//# sourceMappingURL=userLoginController.js.map