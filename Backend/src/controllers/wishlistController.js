const wishlistService = require("../services/wishlistService");

class WishlistController {
  async add(req, res) {
    try {
      const wishlist = await wishlistService.addToWishlist(req.user.id, req.body.productId);
      res.json({ success: true, wishlist });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async remove(req, res) {
    try {
      const wishlist = await wishlistService.removeFromWishlist(req.user.id, req.params.productId);
      res.json({ success: true, wishlist });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async list(req, res) {
    try {
      const wishlist = await wishlistService.getWishlist(req.user.id);
      res.json({ success: true, wishlist });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = new WishlistController();
