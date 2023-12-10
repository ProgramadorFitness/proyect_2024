"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_controller_1 = require("../controllers/client.controller");
const valiidate_token_1 = __importDefault(require("../controllers/valiidate_token"));
const ClientRoutes = (0, express_1.Router)();
//--list
ClientRoutes.get("/list", valiidate_token_1.default, client_controller_1.list);
//--list-ID
ClientRoutes.get("/One/:id", client_controller_1.One);
//--Create
ClientRoutes.post("/create", client_controller_1.create);
//--list-identication
ClientRoutes.get("/ident/:id");
//--update
ClientRoutes.put("/update/:id", client_controller_1.update);
exports.default = ClientRoutes;
