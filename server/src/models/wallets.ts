import { DataTypes } from "sequelize"
import  sequelize  from "../db/connection"

const Wallet = sequelize.define('wallet', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    capital: {
        type: DataTypes.INTEGER
    }
})

export default Wallet