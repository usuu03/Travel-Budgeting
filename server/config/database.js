const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: "travelbudget",
  username: "User",
  password: "$uperDragon13",
  host: "localhost", // Database host
  dialect: "postgres", // Database dialect (e.g., 'mysql', 'sqlite')
});

module.exports = sequelize;
