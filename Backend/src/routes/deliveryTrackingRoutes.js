const express = require("express");
const router = express.Router();
const trackingController = require("../controllers/deliveryTrackingController");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");

// Admin: create tracking manually (optional)
router.post("/create", isAuthenticated, isAdmin, trackingController.createTracking);

// User: get tracking for their order
router.get("/:orderId", isAuthenticated, trackingController.getTracking);

// Admin: update status & location
router.put("/:orderId/status", isAuthenticated, isAdmin, trackingController.updateStatus);

// Admin: get all tracking records
router.get("/admin/all", isAuthenticated, isAdmin, trackingController.getAllTracking);

module.exports = router;
