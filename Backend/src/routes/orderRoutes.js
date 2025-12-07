const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");

// User creates order
router.post("/create", isAuthenticated, orderController.createOrder);

// User views their orders
router.get("/my-orders", isAuthenticated, orderController.getMyOrders);

// Admin: view all orders
router.get("/admin/orders", isAuthenticated, isAdmin, orderController.adminGetOrders);

// Admin: update order status
router.put("/admin/order/:orderId/status", isAuthenticated, isAdmin, orderController.adminUpdateStatus);

module.exports = router;
