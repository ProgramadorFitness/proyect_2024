"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const valiidate_token_1 = __importDefault(require("../controllers/valiidate_token"));
const routesValidate = (0, express_1.Router)();
routesValidate.post("/", valiidate_token_1.default);
exports.default = routesValidate;
