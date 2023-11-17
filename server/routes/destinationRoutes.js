const express = require("express");
const destinationController = require("../controller/destinationController");
const { authenticateUser } = require("../middleware/authentication");

const router = express.Router();

router.get(
  "/user/:id/all",
  authenticateUser,
  destinationController.getUserDestinations
);

router.get("/all", authenticateUser, destinationController.getAllDestinations);

module.exports = router;
