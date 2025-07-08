// This code defines the authentication routes for the application.
// It imports the necessary modules, sets up the router, and defines two routes:
// 1. POST /auth/register - to register a new user.
// 2. POST /auth/login - to log in an existing user.
// The routes are linked to their respective controller functions for handling the requests.

const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// In production, store this securely in .env
const JWT_SECRET =
  process.env.JWT_SECRET || "vandhanchowdhary@gmail.com&&8555867145";

// Register route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check for existing user by email
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });

    // Let Mongoose middleware handle hashing
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;