const cartService = require("../services/cartService");

class CartController {
  async getCart(req, res) {
    try {
      const cart = await cartService.getUserCart(req.user.id);
      res.json({ success: true, cart });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async addToCart(req, res) {
    try {
      const { productId, quantity } = req.body;

      const cart = await cartService.addToCart(
        req.user.id,
        productId,
        quantity
      );

      res.json({ success: true, cart });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async updateQuantity(req, res) {
    try {
      const { productId, quantity } = req.body;

      const cart = await cartService.updateQuantity(
        req.user.id,
        productId,
        quantity
      );

      if (!cart)
        return res.status(404).json({ success: false, message: "Item not found" });

      res.json({ success: true, cart });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async removeItem(req, res) {
    try {
      const { productId } = req.params;

      const cart = await cartService.removeItem(req.user.id, productId);

      res.json({ success: true, cart });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async clearCart(req, res) {
    try {
      await cartService.clearCart(req.user.id);
      res.json({ success: true, message: "Cart cleared" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = new CartController();
