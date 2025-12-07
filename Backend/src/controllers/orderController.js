const orderService = require("../services/orderService");

class OrderController {
  
  async createOrder(req, res) {
    try {
      const { shippingInfo, paymentMethod } = req.body;

      const order = await orderService.createOrder(
        req.user.id,
        shippingInfo,
        paymentMethod
      );

      res.json({ success: true, order });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async getMyOrders(req, res) {
    try {
      const orders = await orderService.getUserOrders(req.user.id);
      res.json({ success: true, orders });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async adminGetOrders(req, res) {
    try {
      const orders = await orderService.getAllOrders();
      res.json({ success: true, orders });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async adminUpdateStatus(req, res) {
    try {
      const { status } = req.body;

      const updated = await orderService.updateOrderStatus(
        req.params.orderId,
        status
      );

      res.json({ success: true, order: updated });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}

module.exports = new OrderController();
