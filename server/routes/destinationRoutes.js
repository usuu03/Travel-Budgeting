const express = require("express");
const destinationController = require("../controller/destinationController");
const { authenticateUser } = require("../middleware/authentication");

const router = express.Router();

//Getting all Destinations
router.get("/all", destinationController.getAllDestinations);

//Getting Destination By ID
router.get("/:id", authenticateUser, destinationController.getDestinationByID);

// Getting all the User Created Destinations
router.get(
  "/user/all",
  authenticateUser,
  destinationController.getUserDestinations
);

// Adding a new Destination
router.post(
  "/user/new/destination",
  authenticateUser,
  destinationController.addDestination
);

// Updating a Destination
router.put(
  "/update/:id",
  authenticateUser,
  destinationController.updateDestination
);

//Deleting a Destination
router.delete(
  "/delete/:id",
  authenticateUser,
  destinationController.deleteDestination
);
module.exports = router;
