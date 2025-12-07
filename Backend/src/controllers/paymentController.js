const paymentService = require("../services/paymentService");

class PaymentController {

  async cod(req, res) {
    const response = await paymentService.processCOD();
    res.json({ success: true, response });
  }

  async stripe(req, res) {
    const { amount } = req.body;
    const payment = await paymentService.processStripe(amount);
    res.json({ success: true, payment });
  }

  async razorpay(req, res) {
    const { amount } = req.body;
    const payment = await paymentService.processRazorpay(amount);
    res.json({ success: true, payment });
  }
}

module.exports = new PaymentController();
