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


const auth = require("../middlewares/authMiddleware");
const admin = require("../middlewares/admin");
const validateOrder = require("../middlewares/validateOrder");
const orderOwner = require("../middlewares/orderOwner");

const orderController = require("../controllers/order.controller");

// User routes
router.post("/", auth, validateOrder, orderController.createOrder);
router.get("/my-orders", auth, orderController.getMyOrders);
router.get("/:orderId", auth, orderOwner, orderController.getOrderById);

// Admin routes
router.get("/", auth, admin, orderController.adminGetOrders);
router.put("/:orderId/status", auth, admin, orderController.adminUpdateStatus);

module.exports = router;


module.exports = router;
