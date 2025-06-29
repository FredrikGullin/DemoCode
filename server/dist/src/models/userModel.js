"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    user_id: String,
    username: String,
    email: String,
    password: String,
    role: String,
    owned_courses: (Array),
}, {
    timestamps: true,
});
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=userModel.js.map