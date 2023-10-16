const express = require("express");
const UserController = require("../controller/userController");
const DestinationController = require("../controller/destinationController");

const router = express.Router();

router.get("/", DestinationController.getAllDestinations);

router.get("/:id", DestinationController.getDestinationById);

router.post("/", DestinationController.addDestination);

router.put("/:id", DestinationController.updateDestination);

router.delete("/:id", DestinationController.deleteDestination);

module.exports = router;
