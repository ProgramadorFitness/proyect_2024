"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Client = connection_1.default.define('client', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_number: {
        type: sequelize_1.DataTypes.STRING
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING
    },
    address: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    phone: {
        type: sequelize_1.DataTypes.STRING
    },
    phone2: {
        type: sequelize_1.DataTypes.STRING
    },
    state: {
        type: sequelize_1.DataTypes.STRING
    },
    genre: {
        type: sequelize_1.DataTypes.STRING
    },
    city: {
        type: sequelize_1.DataTypes.STRING
    },
    neighborhood: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.default = Client;
