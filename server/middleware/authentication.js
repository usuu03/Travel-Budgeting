const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Generate a random secret key (256 bits)
const secretKey = process.env.JWT_SECRET_KEY;

const authenticateUser = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Store user information in the request object
    next(); // Move on to the next middleware or route
  } catch (ex) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = {
  authenticateUser,
};
