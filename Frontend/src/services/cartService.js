import axios from "../api/api";

// Get user's cart
export const getCartApi = () => axios.get("/cart");

// Add item to cart
export const addToCartApi = (productId, quantity = 1) => 
  axios.post("/cart", { productId, quantity });

// Update cart item quantity
export const updateCartItemApi = (itemId, quantity) => 
  axios.put(`/cart/items/${itemId}`, { quantity });

// Remove item from cart
export const removeFromCartApi = (itemId) => 
  axios.delete(`/cart/items/${itemId}`);

// Clear entire cart
export const clearCartApi = () => axios.delete("/cart");