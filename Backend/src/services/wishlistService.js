// const Wishlist = require("../models/wishlistModel");

// class WishlistService {
//   async addToWishlist(userId, productId) {
//     let wishlist = await Wishlist.findOne({ user: userId });

//     if (!wishlist) {
//       wishlist = await Wishlist.create({
//         user: userId,
//         products: [productId],
//       });
//       return wishlist;
//     }

//     if (!wishlist.products.includes(productId)) {
//       wishlist.products.push(productId);
//       await wishlist.save();
//     }

//     return wishlist;
//   }

//   async removeFromWishlist(userId, productId) {
//     const wishlist = await Wishlist.findOneAndUpdate(
//       { user: userId },
//       { $pull: { products: productId } },
//       { new: true }
//     );
//     return wishlist;
//   }

//   async getWishlist(userId) {
//     return await Wishlist.findOne({ user: userId }).populate("products");
//   }
// }

// module.exports = new WishlistService();


const Wishlist = require("../models/Wishlist");

class WishlistService {
  // Get user's wishlist with populated products
  async getWishlist(userId) {
    let wishlist = await Wishlist.findOne({ user: userId })
      .populate({
        path: "products",
        select: "name price imagepath stock plantType isFeatured description"
      });

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: userId, products: [] });
    }

    return wishlist;
  }

  // Add product to wishlist
  async addToWishlist(userId, productId) {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({ 
        user: userId, 
        products: [productId] 
      });
    } else {
      // Check if product already exists
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
        await wishlist.save();
      }
    }

    // Return populated wishlist
    return await Wishlist.findOne({ user: userId })
      .populate({
        path: "products",
        select: "name price imagepath stock plantType isFeatured description"
      });
  }

  // Remove product from wishlist
  async removeFromWishlist(userId, productId) {
    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      throw new Error("Wishlist not found");
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );
    await wishlist.save();

    // Return populated wishlist
    return await Wishlist.findOne({ user: userId })
      .populate({
        path: "products",
        select: "name price imagepath stock plantType isFeatured description"
      });
  }

  // Toggle product in wishlist (add if not present, remove if present)
  async toggleWishlist(userId, productId) {
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({ 
        user: userId, 
        products: [productId] 
      });
      return { added: true, wishlist: await this.getWishlist(userId) };
    }

    const index = wishlist.products.findIndex(
      (id) => id.toString() === productId
    );

    if (index > -1) {
      // Remove if exists
      wishlist.products.splice(index, 1);
      await wishlist.save();
      return { added: false, wishlist: await this.getWishlist(userId) };
    } else {
      // Add if doesn't exist
      wishlist.products.push(productId);
      await wishlist.save();
      return { added: true, wishlist: await this.getWishlist(userId) };
    }
  }

  // Check if product is in wishlist
  async isInWishlist(userId, productId) {
    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) return false;
    return wishlist.products.some((id) => id.toString() === productId);
  }
}

module.exports = new WishlistService();