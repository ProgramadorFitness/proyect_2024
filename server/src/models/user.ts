import { DataTypes } from "sequelize"
import  sequelize  from "../db/connection"

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    id_user: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      },

    username:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      },

    type: {
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
 
    export default User