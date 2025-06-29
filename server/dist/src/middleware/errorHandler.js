"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.statusCode || 500).json({
        status: "error",
        message: err.message || "Internal server error!",
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map