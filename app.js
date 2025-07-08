const express = require("express");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/auth");

dotenv.config();

const app = express();
app.use(express.json());

// Public routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Protected route
app.use("/api/cart", authMiddleware, cartRoutes);

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || "Something went wrong" });
});

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

module.exports = app;