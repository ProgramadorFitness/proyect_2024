import { DataTypes } from "sequelize"
import  sequelize  from "../db/connection"

const Loan = sequelize.define('loan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    id_client:{
        type: DataTypes.STRING
    },

    value_initial: {
        type: DataTypes.STRING
    }
    ,

    value_end:{
        type: DataTypes.STRING
    },

    interest: {
        type: DataTypes.STRING
    },

    state:{
        type: DataTypes.STRING
    },

    id_wallet: {
        type: DataTypes.STRING
    }
}
    )

    export default Loan