require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// const connectDB = require("./config/db");
const connectDB = require("./src/config/db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// connect DB
connectDB();

// default test route
app.get("/", (req, res) => {
    res.send("PlantNest Backend Running...");
});

// import routes
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const wishlistRoutes = require("./src/routes/wishlistRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");
const deliveryTrackingRoutes = require("./src/routes/deliveryTrackingRoutes");

// route middleware
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/tracking", deliveryTrackingRoutes);
app.use("/api/users", userRoutes);


// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
