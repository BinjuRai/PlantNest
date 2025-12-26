// const express = require("express");
// const router = express.Router();
// const wishlistController = require("../controllers/wishlistController");
// const { auth } = require("../middlewares/authMiddleware");

// // Get user's wishlist
// router.get("/", auth, wishlistController.list);

// // Toggle product in wishlist (add/remove)
// router.post("/toggle", auth, wishlistController.toggle);

// // Add item to wishlist
// router.post("/add", auth, wishlistController.add);

// // Remove item from wishlist
// router.delete("/remove/:productId", auth, wishlistController.remove);

// module.exports = router;
const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const { auth } = require("../middlewares/authMiddleware");

// All routes require authentication
router.get("/", auth, wishlistController.list);
router.post("/toggle", auth, wishlistController.toggle);
router.post("/add", auth, wishlistController.add);
router.delete("/remove/:productId", auth, wishlistController.remove);

module.exports = router;