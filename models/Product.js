// This code defines a Mongoose schema for a product in the application.
// It includes various fields such as title, description, category, price, and more.
// Additionally, it defines a nested schema for reviews associated with the product.
// Finally, it exports the model for use in other parts of the application.
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: Number,
  comment: String,
  date: Date,
  reviewerName: String,
  reviewerEmail: String,
});

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  brand: String,
  sku: String,
  warrantyInformation: String,
  shippingInformation: String,
  availabilityStatus: String,
  reviews: [reviewSchema],
  returnPolicy: String,
  images: [String],
  thumbnail: String,
});

module.exports = mongoose.model("Product", productSchema);

