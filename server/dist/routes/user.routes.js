"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const routesUser = (0, express_1.Router)();
routesUser.post('/create', user_controller_1.newUser);
routesUser.post('/login', user_controller_1.loginUser);
exports.default = routesUser;
