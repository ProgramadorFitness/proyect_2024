import { DataTypes } from "sequelize"
import  sequelize  from "./db/connection"

const Loan = sequelize.define('loan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    id_client:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      },

    value_initial: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      },

    value_end:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      },

    interest: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      },
    state:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      },

    id_wallet: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      },
    startLoan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      },
    finishLoan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
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

    duesValue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      },
    paymentF: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      },
}
    )

    export default Loan