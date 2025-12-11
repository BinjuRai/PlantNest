const express = require("express");
const router = express.Router();
const WishlistController = require("../controllers/wishlist.controller");
const auth = require("../middlewares/auth");

router.post("/add", auth, WishlistController.add);
router.delete("/remove/:productId", auth, WishlistController.remove);
router.get("/", auth, WishlistController.list);

module.exports = router;
