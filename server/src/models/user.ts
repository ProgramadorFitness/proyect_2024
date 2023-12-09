import { DataTypes } from "sequelize"
import  sequelize  from "../db/connection"

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    id_collector: {
        type: DataTypes.STRING,
        allowNull: false 
    },

    username:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false 
    }
}
    )
 
    export default User