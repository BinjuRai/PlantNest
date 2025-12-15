// import axios from "../api/api";

// // Get all products/plants
// export const getAllPlantsApi = () => axios.get("/products");

// // Get single product by ID
// export const getPlantByIdApi = (id) => axios.get(`/products/${id}`);

// // Admin - Create product (requires auth + admin)
// export const createPlantApi = (data) => axios.post("/admin/products", data);

// // Admin - Update product
// export const updatePlantApi = (id, data) => axios.put(`/admin/products/${id}`, data);

// // Admin - Delete product
// export const deletePlantApi = (id) => axios.delete(`/admin/products/${id}`);

import axios from "../api/api";

// Get all products/plants - extract data from response
export const getAllPlantsApi = async () => {
  const response = await axios.get("/products");
  return response.data; // Return the actual data array
};

// Get single product by ID
export const getPlantByIdApi = async (id) => {
  const response = await axios.get(`/products/${id}`);
  return response.data;
};

// Admin - Create product (requires auth + admin)
export const createPlantApi = async (data) => {
  const response = await axios.post("/admin/products", data);
  return response.data;
};

// Admin - Update product
export const updatePlantApi = async (id, data) => {
  const response = await axios.put(`/admin/products/${id}`, data);
  return response.data;
};

// Admin - Delete product
export const deletePlantApi = async (id) => {
  const response = await axios.delete(`/admin/products/${id}`);
  return response.data;
};