/* DEPENDENCIES */
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const { TABLES } = require("./constants");

/* CLASS */
class Appointment extends Model {}

Appointment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    date: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TABLES.USER,
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    tableName: TABLES.APPOINTMENT,
    modelName: TABLES.APPOINTMENT,
  }
);

/* EXPORTS */
module.exports = Appointment;
