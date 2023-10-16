const express = require("express");
const app = express();
require("dotenv").config(); // Load environment variables from .env file

// Middleware
app.use(express.json());
const { authenticateUser } = require("./middleware/authentication");

// Routes
const userRoutes = require("./routes/userRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

app.get("/", (req, res) => {
  res.send("Hello World");
});

// User routes
app.use("/user", userRoutes);

// // Destination routes
app.use("/destinations", authenticateUser, destinationRoutes);

// Expense routes
// app.use("/expenses", authenticateUser, expenseRoutes);

const port = process.env.PORT || 4000; // Use the PORT environment variable or default to 4000
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
