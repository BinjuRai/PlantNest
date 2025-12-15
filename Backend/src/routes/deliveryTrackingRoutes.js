// const express = require("express");
// const router = express.Router();
// const trackingController = require("../controllers/deliveryTrackingController");
// const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");

// // Admin: create tracking manually (optional)
// router.post("/create", isAuthenticated, isAdmin, trackingController.createTracking);

// // User: get tracking for their order
// router.get("/:orderId", isAuthenticated, trackingController.getTracking);

// // Admin: update status & location
// router.put("/:orderId/status", isAuthenticated, isAdmin, trackingController.updateStatus);

// // Admin: get all tracking records
// router.get("/admin/all", isAuthenticated, isAdmin, trackingController.getAllTracking);

// module.exports = router;
const express = require("express");
const router = express.Router();
const trackingController = require("../controllers/deliveryTrackingController");
const { auth, adminOnly } = require("../middlewares/authMiddleware");

// Admin: create tracking manually
router.post("/create", auth, adminOnly, trackingController.createTracking);

// User: get tracking for their order
router.get("/:orderId", auth, trackingController.getTracking);

// Admin: update status & location
router.put("/:orderId/status", auth, adminOnly, trackingController.updateStatus);

// Admin: get all tracking records
router.get("/admin/all", auth, adminOnly, trackingController.getAllTracking);

module.exports = router;
