import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

const Payment = sequelize.define('payment', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    id_loan: {
        type: DataTypes.INTEGER
    },

    pass: {
        type: DataTypes.INTEGER
    },

    date: {
        type: DataTypes.DATE
    },

    observation: {
        type: DataTypes.STRING
    }


})

export default Payment