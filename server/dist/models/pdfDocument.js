"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const PdfDocument = connection_1.default.define('PdfDocument', {
    originalname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    mimetype: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    filename: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    size: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    id_cliente: { type: sequelize_1.DataTypes.STRING,
    }
});
exports.default = PdfDocument;
