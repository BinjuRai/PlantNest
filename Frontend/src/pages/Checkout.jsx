




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authProvider";
import { useCart } from "../context/cartContext";
import { toast } from "react-toastify";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, getCartTotal, fetchCart } = useCart();
  const [isGift, setIsGift] = useState(false);
  const [giftInfo, setGiftInfo] = useState({
    name: "",
    phone: "",
    address: "",
    message: "",
  });
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    zipCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const validateNepalPhone = (phone) => {
    const cleaned = phone.replace(/\s|-/g, "");
    const regex = /^(?:\+977)?9[4-8]\d{8}$/;
    return regex.test(cleaned);
  };

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Your cart is empty.</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Add items to checkout
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleGiftChange = (e) => {
    setGiftInfo({ ...giftInfo, [e.target.name]: e.target.value });
  };

  // Handle phone number input with validation
  const handlePhoneChange = (e, type) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    
    if (type === "gift") {
      setGiftInfo({ ...giftInfo, phone: value });
    } else {
      setShippingInfo({ ...shippingInfo, phone: value });
    }
  };

  const validateForm = () => {
    if (!isGift) {
      if (
        !shippingInfo.fullName ||
        !shippingInfo.phone ||
        !shippingInfo.address ||
        !shippingInfo.city
      ) {
        toast.error("Please fill shipping address details");
        return false;
      }

      if (!validateNepalPhone(shippingInfo.phone)) {
        toast.error("Please enter a valid Nepali phone number (10 digits starting with 94-98)");
        return false;
      }
    }

    if (isGift) {
      if (!giftInfo.name || !giftInfo.phone || !giftInfo.address) {
        toast.error("Please fill gift recipient details");
        return false;
      }

      if (!validateNepalPhone(giftInfo.phone)) {
        toast.error("Please enter a valid gift recipient phone number (10 digits starting with 94-98)");
        return false;
      }
    }

    return true;
  };

  const initiateEsewaPayment = async (orderId, amount) => {
    try {
      console.log("Initiating eSewa payment:", { orderId, amount });

      toast.info("Opening eSewa payment page...");

      window.location.href = `/esewa-mock.html?tAmt=${amount}&pid=${orderId}&su=${encodeURIComponent(
        `${window.location.origin}/payment/success`
      )}&fu=${encodeURIComponent(`${window.location.origin}/payment/failure`)}`;
    } catch (error) {
      console.error("eSewa payment error:", error);
      toast.error("Opening demo payment page...");
      window.location.href = `/esewa-mock.html?tAmt=${amount}&pid=${orderId}&su=${window.location.origin}/payment/success&fu=${window.location.origin}/payment/failure`;
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const orderData = {
        shippingInfo: isGift
          ? {
              fullName: giftInfo.name,
              phone: giftInfo.phone,
              address: giftInfo.address,
            }
          : {
              fullName: shippingInfo.fullName,
              phone: shippingInfo.phone,
              address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.zipCode}`,
            },
        paymentMethod,
        isGift,
        giftInfo: isGift
          ? {
              name: giftInfo.name,
              phone: giftInfo.phone,
              address: giftInfo.address,
              message: giftInfo.message,
            }
          : null,
      };

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5050/api/orders",
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const orderId = res.data.order._id;
      const totalAmount = getCartTotal();

      if (paymentMethod === "esewa") {
        toast.info("Redirecting to eSewa...");
        await initiateEsewaPayment(orderId, totalAmount);
      } else if (paymentMethod === "khalti") {
        toast.info("Khalti integration coming soon!");
        setTimeout(() => {
          toast.success("Order placed successfully! 🎉");
          fetchCart();
          navigate("/orders");
        }, 1500);
      } else {
        toast.success("Order placed successfully! 🎉");
        await fetchCart();
        navigate("/orders");
      }
    } catch (err) {
      console.error("Order error:", err);
      toast.error(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            {cart.items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center mb-3 pb-3 border-b"
              >
                <div className="flex items-center gap-3">
                  <span>🌱</span>
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-bold">
                  Rs. {(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            {isGift && (
              <div className="bg-pink-50 p-4 rounded mt-4">
                <p className="font-semibold mb-2">🎁 Gift Details</p>
                <p className="text-sm">Recipient: {giftInfo.name}</p>
                <p className="text-sm">Phone: {giftInfo.phone}</p>
                <p className="text-sm">Address: {giftInfo.address}</p>
                {giftInfo.message && (
                  <p className="text-sm mt-2 italic">💌 "{giftInfo.message}"</p>
                )}
              </div>
            )}

            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>Rs. {getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Shipping Information</h2>

            <form onSubmit={handlePlaceOrder}>
              <div className="mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isGift}
                    onChange={(e) => setIsGift(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>This order is a gift 🎁</span>
                </label>
              </div>

              {isGift && (
                <div className="bg-pink-50 p-4 rounded mb-4">
                  <h3 className="font-semibold mb-3">Gift Recipient Details</h3>
                  <input
                    type="text"
                    name="name"
                    placeholder="Recipient Name *"
                    value={giftInfo.name}
                    onChange={handleGiftChange}
                    className="w-full p-2 rounded border mb-2"
                    required={isGift}
                  />
                  <input
                    type="tel"
                    maxLength={10}
                    name="phone"
                    placeholder="Phone (10 digits: 94XXXXXXXX) *"
                    value={giftInfo.phone}
                    onChange={(e) => handlePhoneChange(e, "gift")}
                    className="w-full p-2 rounded border mb-2"
                    required={isGift}
                  />
                  <textarea
                    name="address"
                    placeholder="Delivery Address *"
                    value={giftInfo.address}
                    onChange={handleGiftChange}
                    className="w-full p-2 rounded border mb-2"
                    rows="2"
                    required={isGift}
                  />
                  <textarea
                    name="message"
                    placeholder="Gift Message (Optional)"
                    value={giftInfo.message}
                    onChange={handleGiftChange}
                    className="w-full p-2 rounded border"
                    rows="2"
                  />
                </div>
              )}

              {!isGift && (
                <div className="space-y-3 mb-4">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name *"
                    value={shippingInfo.fullName}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded border"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    maxLength={10}
                    placeholder="Phone (10 digits: 94XXXXXXXX) *"
                    value={shippingInfo.phone}
                    onChange={(e) => handlePhoneChange(e, "shipping")}
                    className="w-full p-2 rounded border"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address *"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded border"
                    required
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="city"
                      placeholder="City *"
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded border"
                      required
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="Zip Code"
                      value={shippingInfo.zipCode}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded border"
                    />
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-2">Payment Method</h3>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2 rounded border"
                >
                  <option value="cod">💵 Cash on Delivery</option>
                  <option value="esewa">💳 eSewa</option>
                  <option value="khalti">🔵 Khalti</option>
                </select>

                {paymentMethod === "esewa" && (
                  <div className="mt-3 p-3 bg-green-50 rounded text-sm">
                    <p className="font-medium text-green-800">
                      ℹ️ You'll be redirected to eSewa payment gateway
                    </p>
                    <p className="text-green-700 mt-1">
                      Test credentials will be provided on the payment page
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded font-bold mt-6 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Processing..."
                  : paymentMethod === "cod"
                  ? "Place Order 🌿"
                  : `Pay with ${
                      paymentMethod === "esewa" ? "eSewa" : "Khalti"
                    } 💳`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;