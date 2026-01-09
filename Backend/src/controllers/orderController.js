

// const OrderService = require("../services/orderService");
// const mongoose = require("mongoose");

// const Cart = require("../models/cartModel");
// const Order = require("../models/orderModel");
// const Product = require("../models/admin/productModel");
// const trackingService = require("../services/deliveryTrackingService");
// const NotificationService = require("../services/notificationService");

// class OrderController {
//   constructor() {
//     this.createOrder = this.createOrder.bind(this);
//     this.getMyOrders = this.getMyOrders.bind(this);
//     this.getOrderById = this.getOrderById.bind(this);
//     this.adminGetOrders = this.adminGetOrders.bind(this);
//     this.adminUpdateStatus = this.adminUpdateStatus.bind(this);
//     this.adminUpdatePayment = this.adminUpdatePayment.bind(this);
//   }


//   async createOrder(req, res) {
//     try {
//       // const userId = req.user?.id;
//       const userId = req.user?.id || req.user?._id;

//       if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid user ID",
//         });
//       }

//       const { shippingInfo, paymentMethod } = req.body;

//       if (!shippingInfo || !paymentMethod) {
//         return res.status(400).json({
//           success: false,
//           message: "Missing shipping info or payment method",
//         });
//       }

//       const userObjectId = new mongoose.Types.ObjectId(userId);

//       const cart = await Cart.findOne({ user: userObjectId }).populate(
//         "items.product"
//       );

//       if (!cart || cart.items.length === 0) {
//         return res.status(400).json({
//           success: false,
//           message: "Cart is empty",
//         });
//       }

//       const items = cart.items.map((i) => ({
//         product: i.product._id,
//         quantity: i.quantity,
//         price: i.product.price,
//         total: i.quantity * i.product.price,
//       }));

//       const subtotal = items.reduce((sum, i) => sum + i.total, 0);
//       const shippingFee = subtotal > 2000 ? 0 : 150;
//       const totalAmount = subtotal + shippingFee;

//       for (let i of cart.items) {
//         const product = await Product.findById(i.product._id);
//         if (!product) {
//           return res.status(404).json({
//             success: false,
//             message: `Product not found`,
//           });
//         }
//         if (product.stock < i.quantity) {
//           return res.status(400).json({
//             success: false,
//             message: `Not enough stock for ${product.name}`,
//           });
//         }
//         product.stock -= i.quantity;
//         await product.save();
//       }

//       const order = await Order.create({
//         user: userObjectId,
//         items,
//         shippingInfo,
//         paymentMethod,
//         subtotal,
//         shippingFee,
//         totalAmount,
//         status: "pending",
//       });

//       cart.items = [];
//       await cart.save();

//       try {
//         if (trackingService?.createTracking) {
//           await trackingService.createTracking(order._id);
//         }
//       } catch (err) {
//         console.error("Tracking creation failed:", err);
//       }

//       res.status(201).json({
//         success: true,
//         order,
//       });
//     } catch (error) {
//       console.error("Create order error:", error);
//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }

//   async getMyOrders(req, res) {
//     try {
//       console.log("🔍 getMyOrders called!");
//       console.log("🔍 User from token:", req.user);

//       // Use _id instead of id
//       const userId = req.user.id || req.user._id;
//       console.log("🔍 User ID:", userId);

//       const orders = await OrderService.getUserOrders(userId);

//       console.log("📦 Orders found:", orders.length);
//       console.log("📦 First order (if any):", orders[0]);

//       res.json({ success: true, orders });
//     } catch (err) {
//       console.error("❌ Error in getMyOrders:", err);
//       res.status(500).json({ success: false, message: err.message });
//     }
//   }

//   async getOrderById(req, res) {
//     try {
//       const order = await OrderService.getOrderById(req.params.orderId);

//       if (!order) {
//         return res.status(404).json({
//           success: false,
//           message: "Order not found",
//         });
//       }

//       // Ownership check
//       if (
//         order.user._id.toString() !== req.user.id &&
//         req.user.role !== "admin"
//       ) {
//         return res.status(403).json({
//           success: false,
//           message: "Not allowed to view this order",
//         });
//       }

//       res.json({ success: true, order });
//     } catch (err) {
//       res.status(500).json({ success: false, message: err.message });
//     }
//   }

//   async adminGetOrders(req, res) {
//     try {
//       const orders = await OrderService.getAllOrders();
//       res.json({ success: true, orders });
//     } catch (err) {
//       res.status(500).json({ success: false, message: err.message });
//     }
//   }

//   // async adminUpdateStatus(req, res) {
//   //   try {
//   //     const { status } = req.body;

//   //     if (!status) {
//   //       return res.status(400).json({
//   //         success: false,
//   //         message: "Status is required",
//   //       });
//   //     }

//   //     const updated = await OrderService.updateOrderStatus(
//   //       req.params.orderId,
//   //       status
//   //     );

//   //     res.json({ success: true, order: updated });
//   //   } catch (err) {
//   //     res.status(400).json({ success: false, message: err.message });
//   //   }
//   // }

//   async adminUpdateStatus(req, res) {
//   try {
//     const { status } = req.body;

//     if (!status) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Status is required" 
//       });
//     }

//     const updated = await OrderService.updateOrderStatus(
//       req.params.orderId,
//       status
//     );

//     // Create notification for the user
//     const statusTypeMap = {
//       'pending': 'order_placed',
//       'confirmed': 'order_confirmed',
//       'shipped': 'order_shipped',
//       'delivered': 'order_delivered',
//       'cancelled': 'order_cancelled'
//     };

//     const notificationType = statusTypeMap[status];
    
//     if (notificationType) {
//       const notification = await NotificationService.createNotification(
//         updated.user._id || updated.user,
//         notificationType,
//         updated._id
//       );

//       // Emit socket event for real-time notification
//       const io = req.app.get('io');
//       if (io) {
//         io.to(updated.user._id.toString() || updated.user.toString()).emit('notification', {
//           notification,
//           unreadCount: await NotificationService.getUnreadCount(updated.user._id || updated.user)
//         });
//       }
//     }

//     res.json({ success: true, order: updated });
//   } catch (err) {
//     console.error('Error updating order status:', err);
//     res.status(400).json({ success: false, message: err.message });
//   }
// }
//   async adminUpdatePayment(req, res) {
//     try {
//       const { paymentStatus, transactionId } = req.body;

//       if (!paymentStatus) {
//         return res.status(400).json({
//           success: false,
//           message: "Payment status is required",
//         });
//       }

//       const updated = await OrderService.updatePaymentStatus(
//         req.params.orderId,
//         paymentStatus,
//         transactionId
//       );

//       res.json({ success: true, order: updated });
//     } catch (err) {
//       res.status(400).json({ success: false, message: err.message });
//     }
//   }
// }

// module.exports = new OrderController();







const OrderService = require("../services/orderService");
const mongoose = require("mongoose");

const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const Product = require("../models/admin/productModel");
const trackingService = require("../services/deliveryTrackingService");
const NotificationService = require("../services/notificationService");

class OrderController {
  constructor() {
    this.createOrder = this.createOrder.bind(this);
    this.getMyOrders = this.getMyOrders.bind(this);
    this.getOrderById = this.getOrderById.bind(this);
    this.adminGetOrders = this.adminGetOrders.bind(this);
    this.adminUpdateStatus = this.adminUpdateStatus.bind(this);
    this.adminUpdatePayment = this.adminUpdatePayment.bind(this);
    this.verifyPayment = this.verifyPayment.bind(this);
  }

  async createOrder(req, res) {
    try {
      const userId = req.user?.id || req.user?._id;

      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid user ID",
        });
      }

      const { shippingInfo, paymentMethod, isGift, giftInfo } = req.body;

      if (!shippingInfo || !paymentMethod) {
        return res.status(400).json({
          success: false,
          message: "Missing shipping info or payment method",
        });
      }

      const userObjectId = new mongoose.Types.ObjectId(userId);

      const cart = await Cart.findOne({ user: userObjectId }).populate(
        "items.product"
      );

      if (!cart || cart.items.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Cart is empty",
        });
      }

      const items = cart.items.map((i) => ({
        product: i.product._id,
        quantity: i.quantity,
        price: i.product.price,
        total: i.quantity * i.product.price,
      }));

      const subtotal = items.reduce((sum, i) => sum + i.total, 0);
      const shippingFee = subtotal > 2000 ? 0 : 150;
      const totalAmount = subtotal + shippingFee;

      // Check stock availability
      for (let i of cart.items) {
        const product = await Product.findById(i.product._id);
        if (!product) {
          return res.status(404).json({
            success: false,
            message: `Product not found`,
          });
        }
        if (product.stock < i.quantity) {
          return res.status(400).json({
            success: false,
            message: `Not enough stock for ${product.name}`,
          });
        }
        product.stock -= i.quantity;
        await product.save();
      }

      // Create order with payment status based on payment method
      const orderData = {
        user: userObjectId,
        items,
        shippingInfo,
        paymentMethod,
        subtotal,
        shippingFee,
        totalAmount,
        status: "pending",
        paymentStatus: paymentMethod === "cod" ? "pending" : "pending", // Will be updated after payment verification
      };

      // Add gift info if it's a gift order
      if (isGift && giftInfo) {
        orderData.isGift = true;
        orderData.giftInfo = giftInfo;
      }

      const order = await Order.create(orderData);

      // Clear cart
      cart.items = [];
      await cart.save();

      // Create delivery tracking
      try {
        if (trackingService?.createTracking) {
          await trackingService.createTracking(order._id);
        }
      } catch (err) {
        console.error("Tracking creation failed:", err);
      }

      res.status(201).json({
        success: true,
        order,
      });
    } catch (error) {
      console.error("Create order error:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // NEW METHOD: Verify Payment (eSewa/Khalti)
  async verifyPayment(req, res) {
    try {
      const { orderId, paymentMethod, transactionId, amount } = req.body;

      // Validate required fields
      if (!orderId || !paymentMethod || !transactionId) {
        return res.status(400).json({
          success: false,
          message: "Missing required payment details",
        });
      }

      // Find the order
      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      // Check if order belongs to user
      const userId = req.user?.id || req.user?._id;
      if (order.user.toString() !== userId.toString()) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to verify this payment",
        });
      }

      // Check if already paid
      if (order.paymentStatus === "paid") {
        return res.status(400).json({
          success: false,
          message: "Payment already verified for this order",
        });
      }

      // Verify payment based on payment method
      if (paymentMethod === "esewa") {
        // COLLEGE ASSIGNMENT VERSION: Simple verification
        // In production, you would verify with eSewa's API
        
        /* PRODUCTION CODE (for reference):
        const axios = require('axios');
        const verificationUrl = "https://uat.esewa.com.np/epay/transrec";
        const verifyData = {
          amt: amount,
          rid: transactionId,
          pid: orderId,
          scd: "EPAYTEST", // Your merchant code
        };

        try {
          const verifyResponse = await axios.get(verificationUrl, {
            params: verifyData,
          });

          if (!verifyResponse.data.includes("Success")) {
            order.paymentStatus = "failed";
            await order.save();
            
            return res.status(400).json({
              success: false,
              message: "Payment verification failed with eSewa",
            });
          }
        } catch (error) {
          console.error("eSewa verification error:", error);
          return res.status(500).json({
            success: false,
            message: "Failed to verify payment with eSewa",
          });
        }
        */

        console.log("✅ Verifying eSewa payment:", {
          orderId,
          transactionId,
          amount,
        });

        // Update order with payment details
        order.paymentStatus = "paid";
        order.transactionId = transactionId;
        order.paidAt = new Date();
        await order.save();

        // Create notification for user
        try {
          const notification = await NotificationService.createNotification(
            order.user,
            "payment_success",
            order._id
          );

          // Emit socket event for real-time notification
          const io = req.app.get("io");
          if (io) {
            io.to(order.user.toString()).emit("notification", {
              notification,
              unreadCount: await NotificationService.getUnreadCount(order.user),
            });
          }
        } catch (err) {
          console.error("Notification creation failed:", err);
        }

        return res.status(200).json({
          success: true,
          message: "Payment verified successfully",
          order,
        });
      } else if (paymentMethod === "khalti") {
        // Similar implementation for Khalti
        console.log("✅ Verifying Khalti payment:", {
          orderId,
          transactionId,
          amount,
        });

        order.paymentStatus = "paid";
        order.transactionId = transactionId;
        order.paidAt = new Date();
        await order.save();

        // Create notification
        try {
          const notification = await NotificationService.createNotification(
            order.user,
            "payment_success",
            order._id
          );

          const io = req.app.get("io");
          if (io) {
            io.to(order.user.toString()).emit("notification", {
              notification,
              unreadCount: await NotificationService.getUnreadCount(order.user),
            });
          }
        } catch (err) {
          console.error("Notification creation failed:", err);
        }

        return res.status(200).json({
          success: true,
          message: "Payment verified successfully",
          order,
        });
      }

      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    } catch (error) {
      console.error("Payment verification error:", error);
      return res.status(500).json({
        success: false,
        message: "Payment verification failed",
        error: error.message,
      });
    }
  }

  async getMyOrders(req, res) {
    try {
      console.log("🔍 getMyOrders called!");
      console.log("🔍 User from token:", req.user);

      const userId = req.user.id || req.user._id;
      console.log("🔍 User ID:", userId);

      const orders = await OrderService.getUserOrders(userId);

      console.log("📦 Orders found:", orders.length);
      console.log("📦 First order (if any):", orders[0]);

      res.json({ success: true, orders });
    } catch (err) {
      console.error("❌ Error in getMyOrders:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getOrderById(req, res) {
    try {
      const order = await OrderService.getOrderById(req.params.orderId);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      // Ownership check
      const userId = req.user.id || req.user._id;
      if (
        order.user._id.toString() !== userId.toString() &&
        req.user.role !== "admin"
      ) {
        return res.status(403).json({
          success: false,
          message: "Not allowed to view this order",
        });
      }

      res.json({ success: true, order });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async adminGetOrders(req, res) {
    try {
      const orders = await OrderService.getAllOrders();
      res.json({ success: true, orders });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async adminUpdateStatus(req, res) {
    try {
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Status is required",
        });
      }

      const updated = await OrderService.updateOrderStatus(
        req.params.orderId,
        status
      );

      // Create notification for the user
      const statusTypeMap = {
        pending: "order_placed",
        confirmed: "order_confirmed",
        shipped: "order_shipped",
        delivered: "order_delivered",
        cancelled: "order_cancelled",
      };

      const notificationType = statusTypeMap[status];

      if (notificationType) {
        const notification = await NotificationService.createNotification(
          updated.user._id || updated.user,
          notificationType,
          updated._id
        );

        // Emit socket event for real-time notification
        const io = req.app.get("io");
        if (io) {
          io.to(updated.user._id.toString() || updated.user.toString()).emit(
            "notification",
            {
              notification,
              unreadCount: await NotificationService.getUnreadCount(
                updated.user._id || updated.user
              ),
            }
          );
        }
      }

      res.json({ success: true, order: updated });
    } catch (err) {
      console.error("Error updating order status:", err);
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async adminUpdatePayment(req, res) {
    try {
      const { paymentStatus, transactionId } = req.body;

      if (!paymentStatus) {
        return res.status(400).json({
          success: false,
          message: "Payment status is required",
        });
      }

      const updated = await OrderService.updatePaymentStatus(
        req.params.orderId,
        paymentStatus,
        transactionId
      );

      res.json({ success: true, order: updated });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}

module.exports = new OrderController();