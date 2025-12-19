

// import axios from "../api/api";

// // Get all products/plants - extract data from response
// export const getAllPlantsApi = async () => {
//   const response = await axios.get("/products");
//   return response.data; // Return the actual data array
// };

// // Get single product by ID
// export const getPlantByIdApi = async (id) => {
//   const response = await axios.get(`/products/${id}`);
//   return response.data;
// };

// // Admin - Create product (requires auth + admin)
// export const createPlantApi = async (data) => {
//   const response = await axios.post("/admin/products", data);
//   return response.data;
// };

// // Admin - Update product
// export const updatePlantApi = async (id, data) => {
//   const response = await axios.put(`/admin/products/${id}`, data);
//   return response.data;
// };

// // Admin - Delete product
// export const deletePlantApi = async (id) => {
//   const response = await axios.delete(`/admin/products/${id}`);
//   return response.data;
// };
// // // Get all plants/products
// export const getAllPlantsApi = async () => {
//   const response = await api.get("/products");
//   return response.data.products || response.data;
// };

// // Get single plant/product by ID
// export const getPlantByIdApi = async (id) => {
//   const response = await api.get(`/products/${id}`);
//   return response.data.product || response.data;
// };

// // Get featured plants
// export const getFeaturedPlantsApi = async () => {
//   const response = await api.get("/products?featured=true");
//   return response.data.products || response.data;
// };

// // Get plants by category
// export const getPlantsByCategoryApi = async (categoryId) => {
//   const response = await api.get(`/products?category=${categoryId}`);
//   return response.data.products || response.data;
// };
import api from "../api/api";

// Get all plants/products
export const getAllPlantsApi = async () => {
  const response = await api.get("/products");
  return response.data.products || response.data;
};

// Get single plant/product by ID
export const getPlantByIdApi = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data.product || response.data;
};

// Get featured plants
export const getFeaturedPlantsApi = async () => {
  const response = await api.get("/products?featured=true");
  return response.data.products || response.data;
};

// Get plants by category
export const getPlantsByCategoryApi = async (categoryId) => {
  const response = await api.get(`/products?category=${categoryId}`);
  return response.data.products || response.data;
};