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

// // module.exports = router;
// const express = require("express");
// const router = express.Router();
// const wishlistController = require("../controllers/wishlistController");
// const { auth } = require("../middlewares/authMiddleware");

// // All routes require authentication
// // router.get("/", auth, wishlistController.list);
// router.get("/", (req, res) => {
//   res.json({ success: true, message: "Wishlist route working", wishlist: [] });
// });
// router.post("/toggle", auth, wishlistController.toggle);
// router.post("/add", auth, wishlistController.add);
// router.delete("/remove/:productId", auth, wishlistController.remove);

// module.exports = router;

const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const { auth } = require("../middlewares/authMiddleware");

// Temporary test routes - comment out the controller routes
router.get("/", (req, res) => {
  res.json({ success: true, message: "Wishlist route working", wishlist: [] });
});

router.post("/toggle", (req, res) => {
  res.json({ success: true, message: "Toggle working (temp)" });
});

router.post("/add", (req, res) => {
  res.json({ success: true, message: "Add working (temp)" });
});

router.delete("/remove/:productId", (req, res) => {
  res.json({ success: true, message: "Remove working (temp)" });
});

// // router.post("/toggle", auth, wishlistController.toggle);
// // router.post("/add", auth, wishlistController.add);
// // router.delete("/remove/:productId", auth, wishlistController.remove);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const wishlistController = require("../controllers/wishlistController");
// const { authenticate } = require("../middlewares/authMiddleware");

// // Routes
// router.get("/", authenticate, wishlistController.list);
// router.post("/toggle", authenticate, wishlistController.toggle);
// router.post("/add", authenticate, wishlistController.add);
// router.delete("/remove/:productId", authenticate, wishlistController.remove);

// module.exports = router;
