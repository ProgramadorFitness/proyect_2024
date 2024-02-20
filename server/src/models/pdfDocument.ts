import { DataTypes, Model } from "sequelize"
import  sequelize  from "../db/connection"

const PdfDocument = sequelize.define('PdfDocument', {
    originalname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mimetype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_cliente:{type: DataTypes.STRING,
    }
  });
  
  export default PdfDocument