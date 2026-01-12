
import api from "../api/api";


export const getAllPlantsApi = async () => {
  const response = await api.get("/products");
  return response.data.products || response.data;
};


export const getPlantByIdApi = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data.product || response.data;
};


export const getFeaturedPlantsApi = async () => {
  const response = await api.get("/products?featured=true");
  return response.data.products || response.data;
};


export const getPlantsByCategoryApi = async (categoryId) => {
  const response = await api.get(`/products?category=${categoryId}`);
  return response.data.products || response.data;
};