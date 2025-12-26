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
// const cartRoute = require("./src/routes/cartRoute");

// // Connect to MongoDB
// connectDB();

// const app = express();

// // Middleware
// const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//   credentials: true
// }));
// app.use(express.json());

// // Routes
// app.use("/uploads", express.static("uploads"));
// app.use("/api/auth", userRoutes);
// app.use("/api/admin/products", adminProductRoutes);
// app.use("/api/admin/categories", adminCategoryRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/wishlist", wishlistRoutes);
// app.use("/api/delivery-tracking", deliveryTrackingRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/cart", cartRoute);
// // Test route
// app.get("/test", (req, res) => {
//   res.send("Server is working!");
// });

// // Start server
// const PORT = process.env.PORT || 5050;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./src/config/db");

// // Load env vars
// dotenv.config();

// // Connect to database
// connectDB();

// const app = express();

// // Middleware
// app.use(cors({
//   origin: process.env.CLIENT_URL || "http://localhost:5173",
//   credentials: true
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Health check route
// app.get("/", (req, res) => {
//   res.json({ 
//     success: true, 
//     message: "PlantNest API is running! 🌱"
//   });
// });

// // Import Routes
// const authRoutes = require("./routes/authRoutes");
// const productRoutes = require("./routes/productRoutes");
// const categoryRoutes = require("./routes/categoryRoutes");
// const cartRoutes = require("./routes/cartRoutes");

// // Use Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/cart", cartRoutes);

// // Import new routes only if they exist
// try {
//   const orderRoutes = require("./routes/orderRoutes");
//   app.use("/api/orders", orderRoutes);
//   console.log("✅ Order routes loaded");
// } catch (err) {
//   console.log("⚠️  Order routes not found");
// }

// try {
//   const paymentRoutes = require("./routes/paymentRoutes");
//   app.use("/api/payments", paymentRoutes);
//   console.log("✅ Payment routes loaded");
// } catch (err) {
//   console.log("⚠️  Payment routes not found");
// }

// try {
//   const notificationRoutes = require("./routes/notificationRoutes");
//   app.use("/api/notifications", notificationRoutes);
//   console.log("✅ Notification routes loaded");
// } catch (err) {
//   console.log("⚠️  Notification routes not found");
// }

// // 404 handler
// app.use("*", (req, res) => {
//   res.status(404).json({ 
//     success: false, 
//     message: "Route not found" 
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ 
//     success: false, 
//     message: err.message || "Something went wrong!" 
//   });
// });

// module.exports = app;

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db"); // Fixed path!

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/", (req, res) => {
  res.json({ 
    success: true, 
    message: "PlantNest API is running! 🌱"
  });
});

// Import existing routes - use your actual route files
try {
  const userRoutes = require("./routes/userRoutes");
  app.use("/api/users", userRoutes);
  console.log("✅ User routes loaded");
} catch (err) {
  console.log("⚠️  User routes not found");
}

try {
  const productRoutes = require("./routes/product.routes");
  app.use("/api/products", productRoutes);
  console.log("✅ Product routes loaded");
} catch (err) {
  console.log("⚠️  Product routes not found");
}

try {
  const categoryRoutes = require("./routes/category.routes");
  app.use("/api/categories", categoryRoutes);
  console.log("✅ Category routes loaded");
} catch (err) {
  console.log("⚠️  Category routes not found");
}

try {
  const cartRoutes = require("./routes/cart.routes");
  app.use("/api/cart", cartRoutes);
  console.log("✅ Cart routes loaded");
} catch (err) {
  console.log("⚠️  Cart routes not found");
}

try {
  const wishlistRoutes = require("./routes/wishlist.routes");
  app.use("/api/wishlist", wishlistRoutes);
  console.log("✅ Wishlist routes loaded");
} catch (err) {
  console.log("⚠️  Wishlist routes not found");
}

// NEW ROUTES for notifications and orders
try {
  const orderRoutes = require("./routes/orderRoutes");
  app.use("/api/orders", orderRoutes);
  console.log("✅ Order routes loaded");
} catch (err) {
  console.log("⚠️  Order routes not found - create from artifacts");
}

try {
  const paymentRoutes = require("./routes/paymentRoutes");
  app.use("/api/payments", paymentRoutes);
  console.log("✅ Payment routes loaded");
} catch (err) {
  console.log("⚠️  Payment routes not found - create from artifacts");
}

try {
  const notificationRoutes = require("./routes/notificationRoutes");
  app.use("/api/notifications", notificationRoutes);
  console.log("✅ Notification routes loaded");
} catch (err) {
  console.log("⚠️  Notification routes not found - create from artifacts");
}

try {
  const trackingRoutes = require("./routes/deliveryTrackingRoutes");
  app.use("/api/tracking", trackingRoutes);
  console.log("✅ Tracking routes loaded");
} catch (err) {
  console.log("⚠️  Tracking routes not found");
}

// 404 handler - Fixed for Express 5
app.use((req, res, next) => {
  res.status(404).json({ 
    success: false, 
    message: "Route not found" 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: err.message || "Something went wrong!" 
  });
});

module.exports = app;