const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;

// This code defines an authentication middleware for the Node.js application.
// It checks for a valid JWT token in the request headers and verifies it.
// If the token is valid, it adds the user ID to the request object and calls the next middleware.
// If the token is missing or invalid, it returns a 401 Unauthorized response.
