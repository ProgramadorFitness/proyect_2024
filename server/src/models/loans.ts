import { DataTypes } from "sequelize"
import  sequelize  from "../db/connection"

const Loan = sequelize.define('loan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    id_client:{
        type: DataTypes.INTEGER,
        
    },

    value_initial: {
        type: DataTypes.INTEGER
    }
    ,

    value_end:{
        type: DataTypes.INTEGER
    },

    interest: {
        type: DataTypes.INTEGER
    },

    state:{
        type: DataTypes.STRING
    },

    id_wallet: {
        type: DataTypes.STRING
    },
    startLoan: {
        type: DataTypes.STRING
    },
    finishLoan: {
        type: DataTypes.STRING
    },
    dues: {
        type: DataTypes.INTEGER
    },

    duesValue: {
        type: DataTypes.INTEGER
    },
    paymentF: {
        type: DataTypes.STRING
    }
}
    )

    export default Loan