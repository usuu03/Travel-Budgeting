const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/dbConfig");
const secretKey = process.env.JWT_SECRET_KEY; // Define your JWT secret key

const getAllUsers = (req, res) => {
  try {
    // Retrieve all users from the User table
    db.query("SELECT * FROM User", (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Error retrieving users" });
      }

      // Return the list of users
      res.status(200).json(results);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users" });
  }
};

async function getUserById(req, res) {
  const { id } = req.params;

  try {
    // Retrieve the user with the specified ID from the User table
    db.query(
      "SELECT emailAdress and password FROM User WHERE id = ?",
      [id],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Error finding user" });
        }

        if (results.length === 0) {
          return res.status(404).json({ message: "No such user" });
        }

        // Return the user found by ID
        res.status(200).json(results[0]);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const register = async (req, res) => {
  try {
    const { firstName, lastName, emailAddress, password } = req.body;

    // Hash the password securely with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the User table with the hashed password
    const insertQuery =
      "INSERT INTO User (firstName, lastName, emailAddress, password) VALUES (?, ?, ?, ?)";
    await db
      .promise()
      .query(insertQuery, [firstName, lastName, emailAddress, hashedPassword]);

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;

    // Find the user by email address
    const selectQuery = "SELECT * FROM User WHERE emailAddress = ?";
    const [results] = await db.promise().query(selectQuery, [emailAddress]);

    if (results.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = results[0];

    // Check the password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // Generate a JWT token if the password is correct
      const token = jwt.sign({ emailAddress }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });

      res.status(200).json({ message: "Login successful", token });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login Unsuccessful" });
  }
};

async function updateUser(req, res) {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    if (updatedData.password) {
      // Hash the password before updating
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    // Update the user in the User table
    const updateQuery = "UPDATE User SET ? WHERE userID = ?";
    const [results] = await db.promise().query(updateQuery, [updatedData, id]);

    // Check if any rows were affected by the update
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // User updated successfully
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    // Check if the user exists
    const [userRows] = await db
      .promise()
      .query("SELECT * FROM User WHERE userID = ?", [id]);

    if (userRows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user from the User table
    const [results] = await db
      .promise()
      .query("DELETE FROM User WHERE userID = ?", [id]);

    // Check if any rows were affected by the delete
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // User deleted successfully
    res.status(200).json({ message: "User deleted successfully", results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  login,
  register,
  updateUser,
  deleteUser,
};
