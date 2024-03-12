import { DataTypes, Model } from "sequelize"
import  sequelize  from "../db/connection"

const PdfDocument = sequelize.define('PdfDocument', {
 
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
  id_client: {
    type: DataTypes.STRING, 
    allowNull: false,
  }
  });
  
  export default PdfDocument