// const express = require("express");
// const router = express.Router();
// const orderController = require("../controllers/orderController");
// const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");
// const auth = require("../middlewares/authMiddleware");



// // User creates order
// router.post("/create", isAuthenticated, orderController.createOrder);

// // User views their orders
// router.get("/my-orders", isAuthenticated, orderController.getMyOrders);

// // Admin: view all orders
// router.get("/admin/orders", isAuthenticated, isAdmin, orderController.adminGetOrders);

// // Admin: update order status
// router.put("/admin/order/:orderId/status", isAuthenticated, isAdmin, orderController.adminUpdateStatus);




// // User routes
// router.post("/", auth, validateOrder, orderController.createOrder);
// router.get("/my-orders", auth, orderController.getMyOrders);
// router.get("/:orderId", auth, orderOwner, orderController.getOrderById);

// // Admin routes
// router.get("/", auth, admin, orderController.adminGetOrders);
// router.put("/:orderId/status", auth, admin, orderController.adminUpdateStatus);

// module.exports = router;


const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/orderController");
// const authMiddleware = require("../middlewares/authMiddleware");
const orderOwner = require("../middlewares/orderOwner");
// const adminMiddleware = require("../middlewares/adminMiddleware");
const { auth, adminOnly } = require("../middlewares/authMiddleware");
router.post("/", auth, OrderController.createOrder);

router.get("/my-orders", auth, OrderController.getMyOrders);

router.get("/:orderId", auth, orderOwner, OrderController.getOrderById);

router.get("/admin/all", auth, adminOnly, OrderController.adminGetOrders);

router.put(
  "/admin/:orderId/status",
  auth,
  adminOnly,
  OrderController.adminUpdateStatus
);
