import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "../routes/userRoutes.js";
dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/users", userRoutes);
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/categories", require("./routes/category.routes"));
app.use("/api/cart", require("./routes/cart.routes"));
app.use("/api/wishlist", require("./routes/wishlist.routes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/tracking", require("./routes/deliveryTrackingRoutes"));
app.use("/api/notifications", "./routes/notificationRoutes");
app.use("/api/blogs", require("./routes/blogRoutes"));
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

export default app;
