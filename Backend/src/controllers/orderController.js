// // src/controllers/orderController.js
// const OrderService = require("../services/orderService");
// const { auth } = require('../middleware/authMiddleware');

// class OrderController {
  
//   // User creates an order
//   async createOrder(req, res) {
//     try {
//       const { shippingInfo, paymentMethod } = req.body;

//       const order = await OrderService.createOrder(
//         req.user.id,
//         shippingInfo,
//         paymentMethod
//       );

//       res.json({ success: true, order });
//     } catch (err) {
//       res.status(400).json({ success: false, message: err.message });
//     }
//   }

//   // User views their own orders
//   async getMyOrders(req, res) {
//     try {
//       const orders = await OrderService.getUserOrders(req.user.id);
//       res.json({ success: true, orders });
//     } catch (err) {
//       res.status(500).json({ success: false, message: err.message });
//     }
//   }

//   // User views a specific order by ID
//   async getOrderById(req, res) {
//     try {
//       const order = await OrderService.getOrderById(req.params.orderId, req.user.id);
//       if (!order) return res.status(404).json({ success: false, message: "Order not found" });
//       res.json({ success: true, order });
//     } catch (err) {
//       res.status(500).json({ success: false, message: err.message });
//     }
//   }

//   // Admin: get all orders
//   async adminGetOrders(req, res) {
//     try {
//       const orders = await OrderService.getAllOrders();
//       res.json({ success: true, orders });
//     } catch (err) {
//       res.status(500).json({ success: false, message: err.message });
//     }
//   }

//   // Admin: update order status
//   async adminUpdateStatus(req, res) {
//     try {
//       const { status } = req.body;
//       const updated = await OrderService.updateOrderStatus(
//         req.params.orderId,
//         status
//       );
//       res.json({ success: true, order: updated });
//     } catch (err) {
//       res.status(400).json({ success: false, message: err.message });
//     }
//   }
// }

// module.exports = new OrderController();

const OrderService = require("../services/orderService");

class OrderController {
  constructor() {
    // Bind all methods so `this` works when passed to Express
    this.createOrder = this.createOrder.bind(this);
    this.getMyOrders = this.getMyOrders.bind(this);
    this.getOrderById = this.getOrderById.bind(this);
    this.adminGetOrders = this.adminGetOrders.bind(this);
    this.adminUpdateStatus = this.adminUpdateStatus.bind(this);
  }

  // User creates an order
  async createOrder(req, res) {
    try {
      const { shippingInfo, paymentMethod } = req.body;

      if (!shippingInfo || !paymentMethod) {
        return res.status(400).json({ success: false, message: "Missing shipping info or payment method" });
      }

      const order = await OrderService.createOrder(
        req.user.id,
        shippingInfo,
        paymentMethod
      );

      res.json({ success: true, order });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  // User views their own orders
  async getMyOrders(req, res) {
    try {
      const orders = await OrderService.getUserOrders(req.user.id);
      res.json({ success: true, orders });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  // User views a specific order by ID (ownership checked here)
  async getOrderById(req, res) {
    try {
      const order = await OrderService.getOrderById(req.params.orderId);

      if (!order) return res.status(404).json({ success: false, message: "Order not found" });

      // Ownership check: only owner or admin can view
      if (order.user.toString() !== req.user.id && !req.user.role === "admin"
) {
        return res.status(403).json({ success: false, message: "Not allowed to view this order" });
      }

      res.json({ success: true, order });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  // Admin: get all orders
  async adminGetOrders(req, res) {
    try {
      const orders = await OrderService.getAllOrders();
      res.json({ success: true, orders });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  // Admin: update order status
  async adminUpdateStatus(req, res) {
    try {
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ success: false, message: "Status is required" });
      }

      const updated = await OrderService.updateOrderStatus(
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
