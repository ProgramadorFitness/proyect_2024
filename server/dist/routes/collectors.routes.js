"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const collectors_controller_1 = require("../controllers/collectors.controller");
const CollectorsRoutes = (0, express_1.Router)();
//--List
CollectorsRoutes.get("/list", collectors_controller_1.list);
//--Create
CollectorsRoutes.post("/create", collectors_controller_1.create);
//--Create
CollectorsRoutes.get("/One/:id", collectors_controller_1.One);
//--delete
CollectorsRoutes.delete("/delete/:id", collectors_controller_1.delet);
//--update
CollectorsRoutes.put("/update/:id", collectors_controller_1.update);
exports.default = CollectorsRoutes;
