import { Sequelize } from "sequelize";

const sequelize = new Sequelize('base_proyect', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize