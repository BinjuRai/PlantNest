
// import api from "../api/api";

// // Public routes
// export const getBlogs = () => api.get("/blogs");        // Adjust if public route is different
// export const getBlog = (id) => api.get(`/blogs/${id}`);

// // Admin routes
// export const createBlog = (data) =>
//   api.post("/api/admin/blogs", data, {
//     headers: { "Content-Type": "multipart/form-data" }
//   });

// export const updateBlog = (id, data) =>
//   api.put(`/api/admin/blogs/${id}`, data, {
//     headers: { "Content-Type": "multipart/form-data" }
//   });

// export const deleteBlog = (id) =>
//   api.delete(`/api/admin/blogs/${id}`);
import api from "../api/api";

/* Get blogs (with pagination) */
export const getBlogs = (params) =>
  api.get("/admin/blogs", { params });

/* Get single blog */
export const getBlog = (id) =>
  api.get(`/admin/blogs/${id}`);

/* Create blog */
export const createBlog = (data) =>
  api.post("/admin/blogs", data);

/* Update blog */
export const updateBlog = (id, data) =>
  api.put(`/admin/blogs/${id}`, data);

/* Delete blog */
export const deleteBlog = (id) =>
  api.delete(`/admin/blogs/${id}`);

