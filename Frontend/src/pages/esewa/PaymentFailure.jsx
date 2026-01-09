import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentFailure = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    toast.error("Payment was cancelled or failed");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
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
          Payment Failed
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment could not be processed. This could be due to:
        </p>

        <ul className="text-left text-sm text-gray-700 mb-6 space-y-2">
          <li>• Payment was cancelled</li>
          <li>• Insufficient balance</li>
          <li>• Network connectivity issues</li>
          <li>• Incorrect payment details</li>
        </ul>

        {searchParams.get("oid") && (
          <div className="bg-red-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-red-800">
              Order ID: {searchParams.get("oid")}
            </p>
            <p className="text-xs text-red-600 mt-1">
              Your order is still in pending status
            </p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/products")}
            className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300"
          >
            Continue Shopping
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Need help? Contact our support team
        </p>
      </div>
    </div>
  );
};

export default PaymentFailure;