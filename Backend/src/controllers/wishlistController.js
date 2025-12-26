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
  async add(req, res) {
    try {
      console.log("Add to wishlist - User:", req.user.id, "Product:", req.body.productId);
      
      if (!req.body.productId) {
        return res.status(400).json({ 
          success: false, 
          message: "Product ID is required" 
        });
      }

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
      console.error("Add to wishlist controller error:", err);
      res.status(400).json({ 
        success: false, 
        message: err.message || "Failed to add to wishlist" 
      });
    }
  }

  async remove(req, res) {
    try {
      console.log("Remove from wishlist - User:", req.user.id, "Product:", req.params.productId);
      
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
      console.error("Remove from wishlist controller error:", err);
      res.status(400).json({ 
        success: false, 
        message: err.message || "Failed to remove from wishlist"
      });
    }
  }

  async list(req, res) {
    try {
      console.log("Get wishlist - User:", req.user.id);
      
      const wishlist = await wishlistService.getWishlist(req.user.id);
      
      res.json({ 
        success: true, 
        wishlist 
      });
    } catch (err) {
      console.error("Get wishlist controller error:", err);
      res.status(500).json({ 
        success: false, 
        message: err.message || "Failed to fetch wishlist"
      });
    }
  }

  async toggle(req, res) {
    try {
      console.log("Toggle wishlist - User:", req.user.id, "Product:", req.body.productId);
      
      if (!req.body.productId) {
        return res.status(400).json({ 
          success: false, 
          message: "Product ID is required" 
        });
      }

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
      console.error("Toggle wishlist controller error:", err);
      res.status(400).json({ 
        success: false, 
        message: err.message || "Failed to toggle wishlist"
      });
    }
  }
}

module.exports = new WishlistController();
