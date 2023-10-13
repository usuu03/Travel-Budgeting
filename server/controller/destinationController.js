const Destination = require("../models/Destination");
const User = require("../models/User");

const getAllDestinations = async (req, res) => {
  const destinations = await Destination.findAll();

  res.status(200).json(destinations);
};

const getDestinationById = async (req, res) => {
  try {
    const { id } = req.params;

    const destination = await Destination.findByPk(id);

    if (!destination) {
      res
        .status(404)
        .json({ error: "Destination with id: " + id + " cannot be found" });
    }

    res.status(200).json(destination);
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addDestination = async (req, res) => {
  try {
    const { name, description, userId } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      res
        .status(404)
        .json({ message: "User with id: " + userId + " does not exist" });
    }

    const newDestination = await Destination.create({
      name,
      description,
      userId: user.id,
    });

    res
      .status(201)
      .json({ message: "New destination added", destination: newDestination });
  } catch (error) {
    console.error("Error adding destination", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDestination = req.body;

    const destinationUpdate = await Destination.findByPk(id);

    if (!destinationUpdate) {
      return res.status(404).json({ message: "No such vehicle" });
    }

    await destinationUpdate.update(updatedDestination);
    res.status(200).json({
      message: "Destination updated successfully",
      destination: updateDestination,
    });
  } catch (error) {
    console.error("Error updating destination", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;

    const destinationToDelete = await Destination.findByPk(id);

    if (!destinationToDelete) {
      res.status(404).json({ message: "No such destination" });
    }

    await destinationToDelete.destroy();

    res.status(200).json({
      message: "Destination deleted successfully",
      destination: destinationToDelete,
    });
  } catch (error) {
    console.error("Error deleting destination", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllDestinations,
  getDestinationById,
  addDestination,
  updateDestination,
  deleteDestination,
};
