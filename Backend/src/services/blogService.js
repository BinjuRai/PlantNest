const Blog = require("../models/admin/blogModel");

const createBlog = (data) => Blog.create(data);

const getAllBlogs = () => Blog.find().sort({ createdAt: -1 });

const getBlogById = (id) => Blog.findById(id);

const updateBlog = (id, data) =>
  Blog.findByIdAndUpdate(id, data, { new: true });

const deleteBlog = (id) => Blog.findByIdAndDelete(id);

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
};
