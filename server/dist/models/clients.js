"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("./db/connection"));
const Client = connection_1.default.define('client', {
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
    phone2: {
        type: sequelize_1.DataTypes.STRING
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
    bl: {
        type: sequelize_1.DataTypes.STRING,
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
exports.default = Client;
