'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Expense.init({
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    category: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    currency: DataTypes.STRING,
    notes: DataTypes.TEXT,
    destinationId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Expense',
  });
  return Expense;
};