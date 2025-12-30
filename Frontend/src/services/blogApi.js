
import api from "../api/api";

// Public routes
export const getBlogs = () => api.get("/api/blogs");        // Adjust if public route is different
export const getBlog = (id) => api.get(`/api/blogs/${id}`);

// Admin routes
export const createBlog = (data) =>
  api.post("/api/admin/blogs", data, {
    headers: { "Content-Type": "multipart/form-data" }
  });

export const updateBlog = (id, data) =>
  api.put(`/api/admin/blogs/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" }
  });

export const deleteBlog = (id) =>
  api.delete(`/api/admin/blogs/${id}`);
