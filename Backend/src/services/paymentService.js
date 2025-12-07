class PaymentService {

  async processCOD() {
    return { status: "success", method: "COD" };
  }

  async processStripe(amount) {
    // Stripe logic here later
    return { status: "pending", provider: "esewa", amount };
  }

  async processRazorpay(amount) {
    // Razorpay logic here later
    return { status: "pending", provider: "khalti", amount };
  }
}

module.exports = new PaymentService();
