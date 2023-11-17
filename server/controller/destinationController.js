const db = require("../config/dbConfig");

const getUserDestinations = async (req, res) => {
  try {
    const userID = req.params.id; // Access user ID from the URL parameter

    // Query destinations for the specified user ID
    db.query(
      "SELECT * FROM Destination WHERE userID = ?",
      [userID],
      (error, results) => {
        if (error) {
          console.error(error);
          return res
            .status(500)
            .json({ message: "Error retrieving destinations" });
        }

        // Return destinations associated with the specified user ID
        res.status(200).json(results);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllDestinations = async (req, res) => {
  try {
    db.query("SELECT * FROM Destination", (error, results) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Error retrieving Destinations" });
      }

      return res.status(200).json(results);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDestinationByID = async (req, res) => {};

const addDestination = async (req, res) => {};

const updateDestination = async (req, res) => {};

const deleteDestination = async (req, res) => {};

module.exports = {
  getUserDestinations,
  getAllDestinations,
};
