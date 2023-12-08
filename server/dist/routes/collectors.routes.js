"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const collectors_controller_1 = require("../controllers/collectors.controller");
const CollectorsRoutes = (0, express_1.Router)();
//--List
CollectorsRoutes.get("/list", collectors_controller_1.list);
//--Create
CollectorsRoutes.post("/create", collectors_controller_1.create);
//--delete
CollectorsRoutes.delete("/delete/:id", collectors_controller_1.delet);
exports.default = CollectorsRoutes;
