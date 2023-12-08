"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Loan = connection_1.default.define('loan', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_client: {
        type: sequelize_1.DataTypes.STRING
    },
    value_initial: {
        type: sequelize_1.DataTypes.STRING
    },
    value_end: {
        type: sequelize_1.DataTypes.STRING
    },
    interest: {
        type: sequelize_1.DataTypes.STRING
    },
    state: {
        type: sequelize_1.DataTypes.STRING
    },
    id_wallet: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.default = Loan;
