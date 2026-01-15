// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import dotenv from "dotenv";
// import mongoose from "mongoose";

// import userRoutes from "../routes/userRoutes.js";
// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/api/users", userRoutes);
// app.use("/api/products", require("./routes/product.routes"));
// app.use("/api/categories", require("./routes/category.routes"));
// app.use("/api/cart", require("./routes/cart.routes"));
// app.use("/api/wishlist", require("./routes/wishlist.routes"));
// app.use("/api/orders", require("./routes/orderRoutes"));
// app.use("/api/payments", require("./routes/paymentRoutes"));
// app.use("/api/tracking", require("./routes/deliveryTrackingRoutes"));
// app.use("/api/notifications", "./routes/notificationRoutes");
// app.use("/api/blogs", require("./routes/blogRoutes"));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// mongoose.connect(process.env.MONGO_URL)
//   .then(() => console.log("DB Connected"))
//   .catch(err => console.log(err));

// export default app;

import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import userRoutes from "../routes/userRoutes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import deliveryTrackingRoutes from "./routes/deliveryTrackingRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

const app = express();

/* ================= FIX __dirname ================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* ================= STATIC FILES (IMAGES) ================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= ROUTES ================= */
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/tracking", deliveryTrackingRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/blogs", blogRoutes);

/* ================= DATABASE ================= */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ DB Connected"))
  .catch((err) => console.error("❌ DB Error:", err));

export default app;
