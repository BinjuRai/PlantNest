import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const oid = searchParams.get("oid"); // order id
        const refId = searchParams.get("refId"); // eSewa reference id
        const amt = searchParams.get("amt"); // amount

        if (!oid) {
          toast.error("Invalid payment details");
          navigate("/checkout");
          return;
        }

        const token = localStorage.getItem("token");

        // Verify payment with backend
        const response = await axios.post(
          "http://localhost:5050/api/orders/verify-payment",
          {
            orderId: oid,
            paymentMethod: "esewa",
            transactionId: refId || "DEMO_" + Date.now(),
            amount: amt,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          setVerified(true);
          toast.success("Payment verified successfully! 🎉");
          
          // Redirect to orders page after 3 seconds
          setTimeout(() => {
            navigate("/orders");
          }, 3000);
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        toast.error("Payment verification failed");
        setVerified(false);
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-xl font-semibold">Verifying payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        {verified ? (
          <>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">
              Payment Successful! 🎉
            </h1>
            <p className="text-gray-600 mb-6">
              Your payment has been verified and your order is confirmed.
            </p>
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-green-800">
                Order ID: {searchParams.get("oid")}
              </p>
              {searchParams.get("refId") && (
                <p className="text-sm text-green-800">
                  Transaction ID: {searchParams.get("refId")}
                </p>
              )}
            </div>
            <button
              onClick={() => navigate("/orders")}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              View My Orders
            </button>
          </>
        ) : (
          <>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-red-600 mb-2">
              Verification Failed
            </h1>
            <p className="text-gray-600 mb-6">
              We couldn't verify your payment. Please contact support.
            </p>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700"
            >
              Return to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;