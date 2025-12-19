// const wishlistService = require("../services/wishlistService");

// class WishlistController {
//   async add(req, res) {
//     try {
//       const wishlist = await wishlistService.addToWishlist(req.user.id, req.body.productId);
//       res.json({ success: true, wishlist });
//     } catch (err) {
//       res.status(400).json({ success: false, message: err.message });
//     }
//   }

//   async remove(req, res) {
//     try {
//       const wishlist = await wishlistService.removeFromWishlist(req.user.id, req.params.productId);
//       res.json({ success: true, wishlist });
//     } catch (err) {
//       res.status(400).json({ success: false, message: err.message });
//     }
//   }

//   async list(req, res) {
//     try {
//       const wishlist = await wishlistService.getWishlist(req.user.id);
//       res.json({ success: true, wishlist });
//     } catch (err) {
//       res.status(500).json({ success: false, message: err.message });
//     }
//   }
// }

// module.exports = new WishlistController();
const wishlistService = require("../services/wishlistService");

class WishlistController {
  // Add product to wishlist
  async add(req, res) {
    try {
      const wishlist = await wishlistService.addToWishlist(
        req.user.id, 
        req.body.productId
      );
      res.json({ 
        success: true, 
        message: "Added to wishlist",
        wishlist 
      });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  // Remove product from wishlist
  async remove(req, res) {
    try {
      const wishlist = await wishlistService.removeFromWishlist(
        req.user.id, 
        req.params.productId
      );
      res.json({ 
        success: true,
        message: "Removed from wishlist", 
        wishlist 
      });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  // Get user's wishlist
  async list(req, res) {
    try {
      const wishlist = await wishlistService.getWishlist(req.user.id);
      res.json({ success: true, wishlist });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  // Toggle product in wishlist
  async toggle(req, res) {
    try {
      const result = await wishlistService.toggleWishlist(
        req.user.id, 
        req.body.productId
      );
      res.json({ 
        success: true,
        message: result.added ? "Added to wishlist" : "Removed from wishlist",
        added: result.added,
        wishlist: result.wishlist
      });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}

module.exports = new WishlistController();