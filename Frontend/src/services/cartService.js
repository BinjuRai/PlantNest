// // import axios from "../api/api";

// // // Get user's cart
// // export const getCartApi = () => axios.get("/cart");

// // // Add item to cart
// // export const addToCartApi = (productId, quantity = 1) => 
// //   axios.post("/cart", { productId, quantity });

// // // Update cart item quantity
// // export const updateCartItemApi = (itemId, quantity) => 
// //   axios.put(`/cart/items/${itemId}`, { quantity });

// // // Remove item from cart
// // export const removeFromCartApi = (itemId) => 
// //   axios.delete(`/cart/items/${itemId}`);

// // // Clear entire cart
// // export const clearCartApi = () => axios.delete("/cart");
// import axios from "axios";

// const API_URL = "http://localhost:5050/api/cart";

// const getAuthHeader = () => {
//   const token = localStorage.getItem("token");
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };

// export const fetchCart = async () => {
//   const res = await axios.get(API_URL, getAuthHeader());
//   return res.data;
// };

// export const addToCart = async (productId, quantity = 1) => {
//   const res = await axios.post(
//     `${API_URL}/add`,
//     { productId, quantity },
//     getAuthHeader()
//   );
//   return res.data;
// };

// export const updateCartItem = async (productId, quantity) => {
//   const res = await axios.put(
//     `${API_URL}/update`,
//     { productId, quantity },
//     getAuthHeader()
//   );
//   return res.data;
// };

// export const removeFromCart = async (productId) => {
//   const res = await axios.delete(
//     `${API_URL}/remove/${productId}`,
//     getAuthHeader()
//   );
//   return res.data;
// };

// export const clearCart = async () => {
//   const res = await axios.delete(`${API_URL}/clear`, getAuthHeader());
//   return res.data;
// };
import axios from "axios";

const API_URL = "http://localhost:5050/api/cart";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get user's cart
export const getCart = async () => {
  const res = await axios.get(API_URL, getAuthHeader());
  return res.data;
};

// Add item to cart
export const addToCart = async (productId, quantity = 1) => {
  const res = await axios.post(
    `${API_URL}/add`,
    { productId, quantity },
    getAuthHeader()
  );
  return res.data;
};

// Update cart item quantity
export const updateCartQuantity = async (productId, quantity) => {
  const res = await axios.put(
    `${API_URL}/update`,
    { productId, quantity },
    getAuthHeader()
  );
  return res.data;
};

// Remove item from cart
export const removeFromCart = async (productId) => {
  const res = await axios.delete(
    `${API_URL}/remove/${productId}`,
    getAuthHeader()
  );
  return res.data;
};

// Clear entire cart
export const clearCart = async () => {
  const res = await axios.delete(`${API_URL}/clear`, getAuthHeader());
  return res.data;
};
