import mysql,{ Connection } from "mysql2";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize('base_proyect', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export const connection1: Connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'base_proyect'
  });
export default sequelize