"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("./db/connection"));
const Collector = connection_1.default.define('collector', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
            },
        },
    },
    id_wallet: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
            },
        },
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
            },
        },
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
            },
        },
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
            },
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
            },
        },
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
            },
        },
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
            },
        },
    },
    genre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
            },
        },
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
            },
        },
    },
    neighborhood: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
            },
        },
    },
});
exports.default = Collector;
