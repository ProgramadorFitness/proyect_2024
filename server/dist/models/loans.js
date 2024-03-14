"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("./db/connection"));
const Loan = connection_1.default.define('loan', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_client: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
            },
        },
    },
    value_initial: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
            },
        },
    },
    value_end: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
            },
        },
    },
    interest: {
        type: sequelize_1.DataTypes.INTEGER,
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
    id_wallet: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
            },
        },
    },
    startLoan: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
            },
        },
    },
    finishLoan: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
            },
        },
    },
    dues: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
            },
        },
    },
    duesValue: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
            },
        },
    },
    paymentF: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
            },
        },
    },
});
exports.default = Loan;
