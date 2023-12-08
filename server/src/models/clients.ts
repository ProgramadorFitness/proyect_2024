import { DataTypes } from "sequelize"
import  sequelize  from "../db/connection"

 const Client = sequelize.define('client', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    id_number:{
        type: DataTypes.STRING
    },

    name: {
        type: DataTypes.STRING
    }
    ,

    lastName:{
        type: DataTypes.STRING
    },

    address: {
        type: DataTypes.STRING
    },

    email:{
        type: DataTypes.STRING
    },

    phone: {
        type: DataTypes.STRING
    },
    phone2: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.STRING
    },
    genre: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    neighborhood: {
        type: DataTypes.STRING
    }
    
}
    )

    export default Client