const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// POST /cart - Add item to cart
router.post("/", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const existingItem = await Cart.findOne({ userId, productId });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.json(existingItem);
    }

    const newItem = new Cart({ userId, productId, quantity });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /cart/:productId - Update quantity
router.put("/:productId", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { quantity } = req.body;

  try {
    const updated = await Cart.findOneAndUpdate(
      { userId, productId: req.params.productId },
      { quantity },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Cart item not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /cart/:productId - Remove item
router.delete("/:productId", authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const removed = await Cart.findOneAndDelete({
      userId,
      productId: req.params.productId,
    });
    if (!removed) return res.status(404).json({ error: "Cart item not found" });
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;