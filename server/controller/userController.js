const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Generate a random secret key (256 bits)
const secretKey = process.env.JWT_SECRET_KEY;

console.log(secretKey);

const getAllUsers = async (req, res) => {
  const users = User.findAll();

  res.status(200).json(users);
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "No such user" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password securely
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create a new user using Sequelize
    const newUser = await User.create({
      name,
      email,
      username,
      password: passwordHash, // Store the hashed password
    });

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser.id }, secretKey, {
      expiresIn: "1h", // Set your desired expiration time
    });

    res.status(201).json({ message: "User registered", token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loggingUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: "1h", // Set your desired expiration time
    });

    res.status(201).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUserData = req.body;

    //Finding User by ID
    const userUpdate = await User.findByPk(id);

    if (!userUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's data
    await userUpdate.update(updatedUserData);

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUser = await User.findByPk(id);

    if (!deleteUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await deleteUser.destroy();

    res.status(200).json(deleteUser);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
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
