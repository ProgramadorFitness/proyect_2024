"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wallets_controller_1 = require("../controllers/wallets.controller");
const WalletsRoutes = (0, express_1.Router)();
//--List
WalletsRoutes.get("/list", wallets_controller_1.list);
//--Create
WalletsRoutes.post("/create", wallets_controller_1.create);
//--delete
WalletsRoutes.delete("/delete/:id", wallets_controller_1.delet);
//--listjoin
WalletsRoutes.get("/listjoin/:id");
exports.default = WalletsRoutes;
