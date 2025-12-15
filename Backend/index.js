// // index.js
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./src/config/db");

// // Routes
// const userRoutes = require("./src/routes/userRoutes");
// const orderRoutes = require("./src/routes/orderRoutes");
// const paymentRoutes = require("./src/routes/paymentRoutes");
// const wishlistRoutes = require("./src/routes/wishlistRoutes");
// const deliveryTrackingRoutes = require("./src/routes/deliveryTrackingRoutes");

// const adminProductRoutes = require("./src/routes/admin/adminProductRoutes");
// const adminCategoryRoutes = require("./src/routes/admin/adminCategoryRoutes");

// const productRoutes = require("./src/routes/productRoutes");
// const categoryRoutes = require("./src/routes/categoryRoutes");


// // Connect to MongoDB
// connectDB();

// const app = express();

// // Middleware
// app.use(cors({
//   origin: process.env.CLIENT_URL || "http://localhost:5173",
//   methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
// }));
// app.use(express.json());

// // Routes
// app.use("/api/auth", userRoutes);
// app.use("/api/admin/products", adminProductRoutes);
// app.use("/api/admin/categories", adminCategoryRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/wishlist", wishlistRoutes);
// app.use("/api/delivery-tracking", deliveryTrackingRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/categories", categoryRoutes);

// // Test route

// app.get("/test", (req, res) => {
//   res.send("Server is working!");
// });

// // Start server
// const PORT = process.env.PORT || 5050;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

// Routes
const userRoutes = require("./src/routes/userRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");
const wishlistRoutes = require("./src/routes/wishlistRoutes");
const deliveryTrackingRoutes = require("./src/routes/deliveryTrackingRoutes");

const adminProductRoutes = require("./src/routes/admin/adminProductRoutes");
const adminCategoryRoutes = require("./src/routes/admin/adminCategoryRoutes");

const productRoutes = require("./src/routes/productRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/categories", adminCategoryRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/delivery-tracking", deliveryTrackingRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// Test route
app.get("/test", (req, res) => {
  res.send("Server is working!");
});

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
