"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection1 = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('base_proyect', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
exports.connection1 = mysql2_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'base_proyect'
});
exports.default = sequelize;
