"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loans_controller_1 = require("../controllers/loans.controller");
const LoansRoutes = (0, express_1.Router)();
//--List
LoansRoutes.get("/list", loans_controller_1.list);
//--Create
LoansRoutes.post("/create", loans_controller_1.create);
//--delete
LoansRoutes.delete("/delete/:id", loans_controller_1.delet);
//--list join
LoansRoutes.get("/listjoin");
//--list join
LoansRoutes.get("/listjoin/:id");
LoansRoutes.put("/updateState/:id", loans_controller_1.updateState);
LoansRoutes.put("/updateState2/:id", loans_controller_1.updateStateEdit);
//--list join
LoansRoutes.get("/listjoinUser/:id");
//--list join
LoansRoutes.get("/listjoinUserCollector/:id");
exports.default = LoansRoutes;
