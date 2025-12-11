const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/adminOrderController");
const { isAuthenticated, isAdmin } = require("../../middlewares/authMiddleware");

router.get("/", isAuthenticated, isAdmin, controller.getAllOrders);
router.put("/:id/status", isAuthenticated, isAdmin, controller.updateOrderStatus);

module.exports = router;
