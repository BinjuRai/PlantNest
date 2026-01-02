// import { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { getPlantByIdApi } from "../services/plantService";
// import { useAuth } from "../auth/authProvider";
// import Loading from "../components/common/Loading";
// import ErrorMessage from "../components/common/ErrorMessage";

// const Checkout = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const plantId = searchParams.get("plantId");

//   const [quantity, setQuantity] = useState(1);
//   const [shippingInfo, setShippingInfo] = useState({
//     address: "",
//     city: "",
//     zipCode: "",
//     phone: user?.phone || "",
//   });

//   const { data: plant, isLoading, error } = useQuery({
//     queryKey: ["plant", plantId],
//     queryFn: () => getPlantByIdApi(plantId),
//     enabled: !!plantId,
//   });

//   if (!plantId) {
//     return (
//       <ErrorMessage
//         title="No product selected"
//         message="Please select a product to checkout"
//         onRetry={() => navigate("/")}
//       />
//     );
//   }

//   if (isLoading) {
//     return <Loading message="Loading product details..." />;
//   }

//   if (error) {
//     return (
//       <ErrorMessage
//         title="Failed to load product"
//         message={error.message}
//         onRetry={() => navigate("/")}
//       />
//     );
//   }

//   const imageUrl = plant?.imagepath
//     ? `http://localhost:5050${plant.imagepath}`
//     : null;

//   const totalPrice = plant ? (plant.price * quantity).toFixed(2) : "0.00";

//   const handleQuantityChange = (change) => {
//     const newQuantity = quantity + change;
//     if (newQuantity >= 1 && newQuantity <= plant.stock) {
//       setQuantity(newQuantity);
//     }
//   };

//   const handleInputChange = (e) => {
//     setShippingInfo({
//       ...shippingInfo,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handlePlaceOrder = (e) => {
//     e.preventDefault();
//     // TODO: Implement order placement API call
//     console.log("Order placed:", {
//       plant,
//       quantity,
//       shippingInfo,
//       totalPrice,
//     });
//     alert("Order functionality coming soon!");
//   };

//   return (
//     <div className="min-h-screen bg-background-light dark:bg-background-dark py-12 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl font-bold mb-8 text-text-light dark:text-text-dark">
//           Checkout 🛒
//         </h1>

//         <div className="grid md:grid-cols-2 gap-8">
//           {/* Order Summary */}
//           <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-lg">
//             <h2 className="text-2xl font-bold mb-6 text-text-light dark:text-text-dark">
//               Order Summary
//             </h2>

//             <div className="flex gap-4 mb-6">
//               {imageUrl ? (
//                 <img
//                   src={imageUrl}
//                   alt={plant.name}
//                   className="w-24 h-24 object-cover rounded-lg"
//                 />
//               ) : (
//                 <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-3xl">
//                   🌱
//                 </div>
//               )}

//               <div className="flex-1">
//                 <h3 className="font-bold text-lg text-text-light dark:text-text-dark">
//                   {plant.name}
//                 </h3>
//                 {plant.scientificName && (
//                   <p className="text-sm italic text-muted-light dark:text-muted-dark">
//                     {plant.scientificName}
//                   </p>
//                 )}
//                 <p className="text-xl font-bold text-primary mt-2">
//                   Rs.{plant.price.toFixed(2)}
//                 </p>
//               </div>
//             </div>

//             {/* Quantity Selector */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
//                 Quantity
//               </label>
//               <div className="flex items-center gap-4">
//                 <button
//                   onClick={() => handleQuantityChange(-1)}
//                   disabled={quantity <= 1}
//                   className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg font-bold disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600"
//                 >
//                   -
//                 </button>
//                 <span className="text-xl font-bold w-12 text-center">
//                   {quantity}
//                 </span>
//                 <button
//                   onClick={() => handleQuantityChange(1)}
//                   disabled={quantity >= plant.stock}
//                   className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg font-bold disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600"
//                 >
//                   +
//                 </button>
//                 <span className="text-sm text-muted-light dark:text-muted-dark">
//                   ({plant.stock} available)
//                 </span>
//               </div>
//             </div>

//             {/* Price Breakdown */}
//             <div className="border-t border-gray-300 dark:border-gray-600 pt-4 space-y-2">
//               <div className="flex justify-between">
//                 <span className="text-muted-light dark:text-muted-dark">Subtotal</span>
//                 <span className="font-semibold">Rs.{totalPrice}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-muted-light dark:text-muted-dark">Shipping</span>
//                 <span className="font-semibold">Free</span>
//               </div>
//               <div className="flex justify-between text-xl font-bold pt-2 border-t border-gray-300 dark:border-gray-600">
//                 <span>Total</span>
//                 <span className="text-primary">Rs.{totalPrice}</span>
//               </div>
//             </div>
//           </div>

//           {/* Shipping Information */}
//           <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-lg">
//             <h2 className="text-2xl font-bold mb-6 text-text-light dark:text-text-dark">
//               Shipping Information
//             </h2>

//             <form onSubmit={handlePlaceOrder} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   value={user?.name || ""}
//                   disabled
//                   className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-text-light dark:text-text-dark"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={shippingInfo.phone}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
//                   placeholder="1234567890"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
//                   Address
//                 </label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={shippingInfo.address}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
//                   placeholder="123 Main St"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
//                     City
//                   </label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={shippingInfo.city}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
//                     placeholder="New York"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
//                     ZIP Code
//                   </label>
//                   <input
//                     type="text"
//                     name="zipCode"
//                     value={shippingInfo.zipCode}
//                     onChange={handleInputChange}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800 text-text-light dark:text-text-dark"
//                     placeholder="10001"
//                   />
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-lg font-semibold text-lg transition mt-6"
//               >
//                 Place Order 🌿
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

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

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>Your cart is empty. Add items to checkout.</h2>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleGiftChange = (e) => {
    setGiftInfo({ ...giftInfo, [e.target.name]: e.target.value });
  };

  // const validateForm = () => {
  //   if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.city) {
  //     toast.error("Please fill all required fields");
  //     return false;
  //   }
  //   return true;
  // };
  // const validateForm = () => {
  //   if (
  //     !shippingInfo.fullName ||
  //     !shippingInfo.phone ||
  //     !shippingInfo.address ||
  //     !shippingInfo.city
  //   ) {
  //     toast.error("Please fill all required fields");
  //     return false;
  //   }

  //   if (isGift && (!giftInfo.name || !giftInfo.phone || !giftInfo.address)) {
  //     toast.error("Please fill gift recipient details");
  //     return false;
  //   }

  //   return true;
  // };
  const validateForm = () => {
    // 🧾 If NOT a gift → normal address required
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
    }

    // 🎁 If gift → gift address required
    if (isGift) {
      if (!giftInfo.name || !giftInfo.phone || !giftInfo.address) {
        toast.error("Please fill gift recipient details");
        return false;
      }
    }

    return true;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Construct payload for backend
      // const orderData = {
      //   shippingInfo: {
      //     address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.zipCode}`,
      //     fullName: shippingInfo.fullName,
      //     phone: shippingInfo.phone,
      //   },
      //   paymentMethod,
      // };
      // const orderData = {
      //   shippingInfo: {
      //     address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.zipCode}`,
      //     fullName: shippingInfo.fullName,
      //     phone: shippingInfo.phone,
      //   },
      //   paymentMethod,
      //   isGift,
      //   giftInfo: isGift
      //     ? {
      //         name: giftInfo.name,
      //         phone: giftInfo.phone,
      //         address: giftInfo.address,
      //         message: giftInfo.message,
      //       }
      //     : null,
      // };
      //      const orderData = {
      //   shippingInfo: isGift
      //     ? {
      //         // 🎁 Deliver to gift recipient
      //         fullName: giftInfo.name,
      //         phone: giftInfo.phone,
      //         address: giftInfo.address,
      //       }
      //     : {
      //         // 📦 Normal delivery
      //         fullName: shippingInfo.fullName,
      //         phone: shippingInfo.phone,
      //         address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.zipCode}`,
      //       },

      //   paymentMethod,
      //   isGift,

      //   giftInfo: isGift
      //     ? {
      //         name: giftInfo.name,
      //         phone: giftInfo.phone,
      //         address: giftInfo.address,
      //         message: giftInfo.message,
      //       }
      //     : null,
      // };
      const orderData = {
        shippingInfo: isGift
          ? {
              // 🎁 Delivery goes to recipient
              fullName: giftInfo.name,
              phone: giftInfo.phone,
              address: giftInfo.address,
            }
          : {
              // 📦 Normal delivery
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

      // Call backend API
      const res = await axios.post(
        "http://localhost:5050/api/orders",
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Success toast
      toast.success("Order placed successfully! 🎉");

      // Clear cart in frontend
      await fetchCart(); // refresh cart after order

      // Navigate to orders page or success page
      navigate("/orders");
    } catch (err) {
      console.error("Order error:", err);
      toast.error(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg"
              >
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-600 flex items-center justify-center rounded-lg">
                  🌱
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{item.product.name}</h3>
                  <p>Qty: {item.quantity}</p>
                  <p>Rs. {(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          {isGift && (
            <div className="mt-4 p-4 border rounded-lg bg-green-50 dark:bg-gray-700">
              <h3 className="font-bold text-lg mb-2">🎁 Gift Details</h3>

              <p>
                <strong>Recipient:</strong> {giftInfo.name}
              </p>
              <p>
                <strong>Phone:</strong> {giftInfo.phone}
              </p>
              <p>
                <strong>Address:</strong> {giftInfo.address}
              </p>

              {giftInfo.message && (
                <p className="mt-2 italic">💌 “{giftInfo.message}”</p>
              )}
            </div>
          )}

          <div className="pt-4 border-t mt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>Rs. {getCartTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping & Payment */}
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={shippingInfo.fullName}
              onChange={handleInputChange}
              className="w-full p-2 rounded border"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={shippingInfo.phone}
              onChange={handleInputChange}
              className="w-full p-2 rounded border"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={shippingInfo.address}
              onChange={handleInputChange}
              className="w-full p-2 rounded border"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={shippingInfo.city}
              onChange={handleInputChange}
              className="w-full p-2 rounded border"
              required
            />
            <input
              type="text"
              name="zipCode"
              placeholder="ZIP Code"
              value={shippingInfo.zipCode}
              onChange={handleInputChange}
              className="w-full p-2 rounded border"
            />
            {/* 🎁 Gift Option */}
            <div className="mt-4">
              <label className="flex items-center gap-2 font-semibold">
                <input
                  type="checkbox"
                  checked={isGift}
                  onChange={(e) => setIsGift(e.target.checked)}
                />
                This order is a gift 🎁
              </label>
            </div>

            {/* 🎁 Gift Details */}
            {isGift && (
              <div className="mt-4 space-y-3 p-4 border rounded-lg bg-white dark:bg-gray-700">
                <h3 className="font-bold text-lg">Gift Recipient Details</h3>

                <input
                  type="text"
                  name="name"
                  placeholder="Recipient Name"
                  value={giftInfo.name}
                  onChange={handleGiftChange}
                  className="w-full p-2 rounded border"
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Recipient Phone"
                  value={giftInfo.phone}
                  onChange={handleGiftChange}
                  className="w-full p-2 rounded border"
                  required
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Recipient Address"
                  value={giftInfo.address}
                  onChange={handleGiftChange}
                  className="w-full p-2 rounded border"
                  required
                />

                <textarea
                  name="message"
                  placeholder="Gift Message (optional)"
                  value={giftInfo.message}
                  onChange={handleGiftChange}
                  className="w-full p-2 rounded border"
                  rows={3}
                />
              </div>
            )}

            <div>
              <h3 className="font-semibold mb-2">Payment Method</h3>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-2 rounded border"
              >
                <option value="cod">Cash on Delivery</option>
                <option value="esewa">eSewa</option>
                <option value="khalti">Khalti</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded font-bold mt-4 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Place Order 🌿"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
