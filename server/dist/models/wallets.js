"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Wallet = connection_1.default.define('wallet', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_collector: {
        type: sequelize_1.DataTypes.STRING
    },
    capital: {
        type: sequelize_1.DataTypes.INTEGER
    }
});
exports.default = Wallet;
