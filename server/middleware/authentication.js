const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    console.error("No token provided");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const tokenPart = token.split(" ")[1];

    const decoded = jwt.verify(tokenPart, process.env.JWT_SECRET_KEY);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Invalid token", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = { authenticateUser };
