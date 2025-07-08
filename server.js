// This file initializes the server and connects to MongoDB using Mongoose.
// It listens on the specified port and logs a message when the server is running.
// If the connection to MongoDB fails, it logs an error message.

const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection failed:", err));

