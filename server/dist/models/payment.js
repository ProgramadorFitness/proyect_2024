"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Payment = connection_1.default.define('payment', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_loan: {
        type: sequelize_1.DataTypes.INTEGER
    },
    payment: {
        type: sequelize_1.DataTypes.INTEGER
    },
    dues: {
        type: sequelize_1.DataTypes.INTEGER
    },
    date: {
        type: sequelize_1.DataTypes.DATE
    },
    observation: {
        type: sequelize_1.DataTypes.STRING
    },
    state: {
        type: sequelize_1.DataTypes.STRING
    },
    realDate: {
        type: sequelize_1.DataTypes.DATE
    },
    outBalance: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.default = Payment;
