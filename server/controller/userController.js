const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Generate a random secret key (256 bits)
const secretKey = process.env.JWT_SECRET_KEY;

// console.log(secretKey);

const login = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;

    //Finding the user by email address
    db.query(
      "SELECT * FROM User WHERE emailAddress = ?",
      [emailAddress],
      async (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Login Failed" });
        }

        if (results.length === 0) {
          return res.status(400).json({ message: "User not found" });
        }

        //Checking the password
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ emailAddress }, process.env.JWT_SECRET_KEY, {
          expiresIn: "1h",
        });

        res.status(200).json({ message: "Login successful", token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login Unsuccessful", token });
  }
};

const register = async (req, res) => {
  try {
    const { firstName, lastName, emailAddress, password } = req.body;

    db.query();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration Unsuccessful", token });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  loggingUser,
  updateUser,
  deleteUser,
};
