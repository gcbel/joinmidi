/* DEPENDENCIES */
const Sequelize = require("sequelize");
require("dotenv").config();

/* SEQUELIZE */
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, {})
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: "localhost",
        dialect: "postgres",
      }
    );

/* EXPORTS */
module.exports = sequelize;
