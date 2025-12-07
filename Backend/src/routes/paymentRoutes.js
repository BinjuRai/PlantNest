const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const { isAuthenticated } = require("../middlewares/auth");

// Cash on Delivery
router.post("/cod", isAuthenticated, paymentController.cod);


router.post("/esewa", isAuthenticated, paymentController.esewa);


router.post("/khalti", isAuthenticated, paymentController.khalti);

module.exports = router;
