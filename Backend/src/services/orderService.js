const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const trackingService = require("../services/deliveryTrackingService");

class OrderService {

  // Create an order from cart
  async createOrder(userId, shippingInfo, paymentMethod) {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0)
      throw new Error("Cart is empty");

    // Calculate amounts
    const items = cart.items.map((i) => ({
      product: i.product._id,
      quantity: i.quantity,
      price: i.product.price,
      total: i.quantity * i.product.price,
    }));

    const subtotal = items.reduce((sum, i) => sum + i.total, 0);
    const shippingFee = subtotal > 2000 ? 0 : 150; // example rule
    const totalAmount = subtotal + shippingFee;

    // Reduce stock
    for (let i of cart.items) {
      const product = await Product.findById(i.product._id);
      if (product.stock < i.quantity)
        throw new Error(`Not enough stock for ${product.name}`);

      product.stock -= i.quantity;
      await product.save();
    }

    // Create order
    const order = await Order.create({
      user: userId,
      items,
      shippingInfo,
      paymentMethod,
      subtotal,
      shippingFee,
      totalAmount,
      status: "Pending",
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    await trackingService.createTracking(order._id);

    return order;
  }

  // Get user orders
  async getUserOrders(userId) {
    return await Order.find({ user: userId }).sort({ createdAt: -1 });
  }

  // Admin: Get all orders
  async getAllOrders() {
    return await Order.find().populate("user");
  }

  // Update order status (admin)
  async updateOrderStatus(orderId, status) {
    return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
  }
 
}

module.exports = new OrderService();
