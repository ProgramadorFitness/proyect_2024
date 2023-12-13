"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payments_controllers_1 = require("../controllers/payments.controllers");
const paymentsRoutes = (0, express_1.Router)();
paymentsRoutes.get("/list", payments_controllers_1.list);
paymentsRoutes.get("/create", payments_controllers_1.create);
exports.default = paymentsRoutes;
