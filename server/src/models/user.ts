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
    },

    type: {
        type: DataTypes.STRING,
        allowNull: false 
    }
}
    )
 
    export default User