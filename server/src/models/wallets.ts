import { DataTypes } from "sequelize"
import  sequelize  from "../db/connection"

const Wallet = sequelize.define('wallet', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    id_collector:{
        type: DataTypes.STRING
    },

    capital: {
        type: DataTypes.INTEGER
    }
})

export default Wallet