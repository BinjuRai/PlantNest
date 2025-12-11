// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

// Routes
const userRoutes = require("./src/routes/userRoutes");

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
}));
app.use(express.json());

// Routes
app.use("/api/auth", userRoutes);

app.get("/test", (req, res) => {
  res.send("Server is working!");
});

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
