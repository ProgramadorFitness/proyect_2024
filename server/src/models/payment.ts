import { DataTypes } from "sequelize";
import sequelize from "./db/connection";

const Payment = sequelize.define('payment', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    id_loan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      },
    payment: {
        type: DataTypes.INTEGER,
      },
    dues: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      },

    date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      },

    observation: {
        type: DataTypes.STRING,
      },

    state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      },

    realDate: {
        type: DataTypes.DATE,
      },

    outBalance: {
        type: DataTypes.STRING,
      },


})

export default Payment