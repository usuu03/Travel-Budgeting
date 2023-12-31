const db = require("../config/dbConfig");

const getUserDestinations = async (req, res) => {
  try {
    // Access user ID from the request object
    const userID = req.user.userId;

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

const getDestinationByID = async (req, res) => {
  try {
    const { id } = req.params;

    const userID = req.user.userId;

    //Query
    const query =
      "SELECT * FROM Destination WHERE destinationID = ? AND userID = ?";

    db.query(query, [id, userID], (error, results) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Error retrieving destination ID" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Destination not found" });
      }

      //Returning the destination
      res.status(200).json(results[0]);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addDestination = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Accessing the user ID from the request object
    const userID = req.user.userId;

    const query = `INSERT INTO Destination
    (name, description, userID)
    VALUES (?, ?, ?)`;

    const values = [name, description, userID];
    db.query(query, values, (error, results) => {
      if (error) {
        console.error(error);
        return res
          .status(404)
          .json({ message: "Error inserting destinations" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Destination not found" });
      }

      // Inseting the destination
      res.status(200).json({ message: "Successfully Inserted: ", results });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateDestination = async (req, res) => {
  try {
    const userID = req.user.userId;
    const { id } = req.params;
    const updatedDestination = req.body;

    //Updating the destination in the Destination Table
    const updatedQuery =
      "UPDATE Destination SET ? WHERE destinationID = ? AND userID = ?";
    const [results] = await db
      .promise()
      .query(updatedQuery, [updatedDestination, id, userID]);

    console.log(results);

    //Checking if the destination exists
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.status(200).json({ message: "Destination Updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: " Internal Server Error" });
  }
};

const deleteDestination = async (req, res) => {
  try {
    const userID = req.user.userId;
    const { id } = req.params;

    const deleteQuery =
      "DELETE FROM Destination WHERE destinationID = ? AND userID = ?";

    const [results] = await db.promise().query(deleteQuery, [id, userID]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res
      .status(200)
      .json({ message: "Successfully deleted destination", results });
  } catch (error) {
    console.error("Destination deletion error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getUserDestinations,
  getAllDestinations,
  getDestinationByID,
  addDestination,
  updateDestination,
  deleteDestination,
};
