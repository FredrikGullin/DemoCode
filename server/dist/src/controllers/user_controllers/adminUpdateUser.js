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
exports.adminUpdateUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = require("../../models/userModel");
exports.adminUpdateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const accessToken = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        const { username, email, password, role, owned_courses, } = req.body;
        if (!accessToken) {
            throw new Error("Controller: Missing access token!");
        }
        const user = yield userModel_1.UserModel.findById(id);
        if (!user) {
            res.status(404).json({ message: "Controller: User not found!" });
            return;
        }
        user.username = username || user.username;
        user.email = email || user.email;
        if (password) {
            const salt = yield bcrypt_1.default.genSalt(10);
            user.password = yield bcrypt_1.default.hash(password, salt);
        }
        if (role) {
            user.role = role || user.role;
        }
        if (owned_courses) {
            user.owned_courses = owned_courses || user.owned_courses;
        }
        const updatedUser = yield user.save();
        res.status(200).json({
            message: "User updated successfully!",
            user: {
                id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                role: updatedUser.role,
                owned_courses: updatedUser.owned_courses,
            },
        });
    }
    catch (error) {
        res.status(500);
        throw new Error(`Controller: Error updating user! - ${error}`);
    }
}));
exports.default = exports.adminUpdateUser;
//# sourceMappingURL=adminUpdateUser.js.map