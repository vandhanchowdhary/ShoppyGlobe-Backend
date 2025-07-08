const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, default: 1, min: 1 },
});

const Cart = mongoose.model("Cart", cartItemSchema);
module.exports = Cart;

// This code defines a Mongoose schema for a shopping cart in the application.
// It includes fields for user ID, items in the cart (with product ID and quantity), and timestamps for creation and updates.
// The schema is then exported as a Mongoose model named "Cart".
