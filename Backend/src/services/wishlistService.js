const Wishlist = require("../models/wishlistModel");

class WishlistService {
  async addToWishlist(userId, productId) {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: userId,
        products: [productId],
      });
      return wishlist;
    }

    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }

    return wishlist;
  }

  async removeFromWishlist(userId, productId) {
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $pull: { products: productId } },
      { new: true }
    );
    return wishlist;
  }

  async getWishlist(userId) {
    return await Wishlist.findOne({ user: userId }).populate("products");
  }
}

module.exports = new WishlistService();


