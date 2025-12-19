
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPlantByIdApi } from "../services/plantService";
import { useAuth } from "../auth/authProvider";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const plantId = searchParams.get("plantId");

  const [quantity, setQuantity] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    zipCode: "",
    phone: user?.phone || "",
  });

  const { data: plant, isLoading, error } = useQuery({
    queryKey: ["plant", plantId],
    queryFn: () => getPlantByIdApi(plantId),
    enabled: !!plantId,
  });

  if (!plantId) {
    return (
      <ErrorMessage
        title="No product selected"
        message="Please select a product to checkout"
        onRetry={() => navigate("/")}
      />
    );
  }

  if (isLoading) {
    return <Loading message="Loading product details..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load product"
        message={error.message}
        onRetry={() => navigate("/")}
      />
    );
  }

  const imageUrl = plant?.imagepath
    ? `http://localhost:5050${plant.imagepath}`
    : null;

  const totalPrice = plant ? (plant.price * quantity).toFixed(2) : "0.00";

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= plant.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // TODO: Implement order placement API call
    console.log("Order placed:", {
      plant,
      quantity,
      shippingInfo,
      totalPrice,
    });
    alert("Order functionality coming soon!");
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-text-light dark:text-text-dark">
          Checkout 🛒
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-text-light dark:text-text-dark">
              Order Summary
            </h2>

            <div className="flex gap-4 mb-6">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={plant.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-3xl">
                  🌱
                </div>
              )}

              <div className="flex-1">
                <h3 className="font-bold text-lg text-text-light dark:text-text-dark">
                  {plant.name}
                </h3>
                {plant.scientificName && (
                  <p className="text-sm italic text-muted-light dark:text-muted-dark">
                    {plant.scientificName}
                  </p>
                )}
                <p className="text-xl font-bold text-primary mt-2">
                  Rs.{plant.price.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg font-bold disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  -
                </button>
                <span className="text-xl font-bold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= plant.stock}
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg font-bold disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  +
                </button>
                <span className="text-sm text-muted-light dark:text-muted-dark">
                  ({plant.stock} available)
                </span>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-gray-300 dark:border-gray-600 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-light dark:text-muted-dark">Subtotal</span>
                <span className="font-semibold">Rs.{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-light dark:text-muted-dark">Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-2 border-t border-gray-300 dark:border-gray-600">
                <span>Total</span>
                <span className="text-primary">Rs.{totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-text-light dark:text-text-dark">
              Shipping Information
            </h2>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user?.name || ""}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-text-light dark:text-text-dark"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
                  placeholder="1234567890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
                  placeholder="123 Main St"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
                    placeholder="New York"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
                    placeholder="10001"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-lg font-semibold text-lg transition mt-6"
              >
                Place Order 🌿
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;