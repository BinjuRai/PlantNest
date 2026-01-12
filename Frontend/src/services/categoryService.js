

import axios from "../api/api";

export const getAllCategoriesApi = async () => {
  const response = await axios.get("/categories");
  return response.data;
};


export const getCategoryByIdApi = async (id) => {
  const response = await axios.get(`/categories/${id}`);
  return response.data;
};