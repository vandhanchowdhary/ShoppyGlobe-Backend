// This code defines the product routes for the application.
// It imports the necessary modules, sets up the router, and defines two routes:
// 1. GET /products - to get all products.
// 2. GET /products/:id - to get a product by its ID.
// The routes are linked to their respective controller functions for handling the requests.

const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// GET /products - Fetch all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: err.message });
  }
});

// GET /products/:id - Fetch product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch product", error: err.message });
  }
});

module.exports = router;
