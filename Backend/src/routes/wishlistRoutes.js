// const express = require("express");
// const router = express.Router();
// const WishlistController = require("../controllers/wishlistController");
// const auth = require("../middlewares/authMiddleware");

// router.post("/add", auth, WishlistController.add);
// router.delete("/remove/:productId", auth, WishlistController.remove);
// router.get("/", auth, WishlistController.list);

// module.exports = router;

const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const { auth } = require("../middlewares/authMiddleware");

// Add item to wishlist
router.post("/add", auth, wishlistController.add);

// Remove item from wishlist
router.delete("/remove/:productId", auth, wishlistController.remove);

// Get user's wishlist
router.get("/", auth, wishlistController.list);

module.exports = router;

