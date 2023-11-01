const mysql2 = require("mysql2"); // or 'mysql2' if you chose that driver

const db = mysql2.createConnection({
  host: "travelbugdeting.cw5agzmuyhnb.eu-west-2.rds.amazonaws.com", // Your database host
  user: "admin", // Your database username
  password: "Usuboy238", // Your database password
  database: "travelbudgeting", // Your database name
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to the database");
  }
});

module.exports = db;
