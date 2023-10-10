const express = require("express");
const app = express();

//Middleware
app.use(express.json());

//Routes
const userRoutes = require("./routes/userRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const expenseController = require("./routes/expenseRoutes");

app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
