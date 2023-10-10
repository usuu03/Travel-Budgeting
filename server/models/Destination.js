const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Destination = sequelize.define("destination", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "user", // This should match the model name for User
      key: "id",
    },
  },
});

module.exports = Destination;
