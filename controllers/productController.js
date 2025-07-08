const Product = require("../models/Product");

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
};
// This code defines the product controller for the application.
// It includes functions to get all products and get a product by its ID.
// The function handles errors by passing then to the next middleware, which can handle them appropriately.
// The functions use Mongoose to interact with the MongoDB database and return the results as JSON responses.
// If a product is not found, it returns a 404 status with an appropriate message.