import { DataTypes } from "sequelize"
import  sequelize  from "../db/connection"

const Collector = sequelize.define('collector', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_number:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      },
    id_wallet:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      },

    lastName:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      },

    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      },

    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      },

    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
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
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      },
    neighborhood: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      },
})

export default Collector