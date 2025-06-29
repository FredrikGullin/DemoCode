"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeInput = void 0;
const validator_1 = __importDefault(require("validator"));
const sanitizeObject = (obj) => {
    if (obj && typeof obj === "object") {
        for (const key in obj) {
            const value = obj[key];
            if (typeof value === "string") {
                obj[key] = validator_1.default.escape(value.trim());
            }
        }
    }
};
const sanitizeInput = (req, res, next) => {
    sanitizeObject(req.body);
    sanitizeObject(req.query);
    sanitizeObject(req.params);
    next();
};
exports.sanitizeInput = sanitizeInput;
//# sourceMappingURL=sanitizeInput.js.map