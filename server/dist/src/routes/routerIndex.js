"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const courseRoutes_1 = __importDefault(require("./courseRoutes"));
exports.routes = express_1.default.Router();
exports.routes.use(userRoutes_1.default, courseRoutes_1.default);
//# sourceMappingURL=routerIndex.js.map