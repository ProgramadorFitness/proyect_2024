import { DataTypes } from "sequelize"
import  sequelize  from "./db/connection"

const Wallet = sequelize.define('wallet', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    capital: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'El campo capital no puede estar vacío', // Mensaje de error personalizado
          },
        },
      }
})

export default Wallet