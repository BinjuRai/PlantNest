const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const { auth } = require("../middlewares/authMiddleware");

// Cash on Delivery
router.post("/cod", auth, paymentController.cod);

// eSewa payment
router.post("/esewa", auth, paymentController.stripe);

// Khalti payment
router.post("/khalti", auth, paymentController.razorpay);

module.exports = router;
