"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("./db/connection"));
const PdfDocument = connection_1.default.define('PdfDocument', {
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    data: {
        type: sequelize_1.DataTypes.BLOB,
        allowNull: false,
    },
    id_client: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
});
exports.default = PdfDocument;
