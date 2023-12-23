"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const collections_controller_1 = require("../controllers/collections.controller");
const collectionsRoutes = (0, express_1.Router)();
collectionsRoutes.get("/list", collections_controller_1.list);
collectionsRoutes.get("/listjoin");
exports.default = collectionsRoutes;
