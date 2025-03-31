/* DEPENDENCIES */
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");
const { TABLES } = require("./constants");

/* CLASS */
class User extends Model {
  checkPassword(pw) {
    return bcrypt.compareSync(pw, this.password) || pw == this.password;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    isClinician: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true, // Allows Google OAuth, checks for length >= 8 on front end
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 8);
        }
        return user;
      },
    },
    sequelize,
    freezeTableName: true,
    tableName: TABLES.USER,
    modelName: TABLES.USER,
  }
);

/* EXPORTS */
module.exports = User;
