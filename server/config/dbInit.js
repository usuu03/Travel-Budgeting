const sequelize = require("../config/database");
const User = require("../models/User");
const Expense = require("../models/Expense");
const Destination = require("../models/Destination");

// Synchronize the models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized.");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });
