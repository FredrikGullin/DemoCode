"use strict";
/* Första route för att testa */
Object.defineProperty(exports, "__esModule", { value: true });
exports.home = void 0;
const express_1 = require("express");
exports.home = (0, express_1.Router)();
exports.home.get("/", (req, res) => {
    res.send("Appeggio Backend API");
});
//# sourceMappingURL=homeRoute.js.map