const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Expense = sequelize.define("expense", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  destinationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Destination", // This should match the model name for Destination
      key: "id",
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "User", // This should match the model name for User
      key: "id",
    },
  },
});

module.exports = Expense;
