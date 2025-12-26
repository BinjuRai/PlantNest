const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { auth } = require("../middlewares/authMiddleware");

// All routes require authentication
router.get("/", auth, cartController.getCart);
router.post("/add", auth, cartController.addToCart);
router.put("/update", auth, cartController.updateQuantity);
router.delete("/remove/:productId", auth, cartController.removeItem);
router.delete("/clear", auth, cartController.clearCart);

module.exports = router;