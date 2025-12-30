import { useEffect, useState } from "react";
import { getBlogs } from "../services/blogApi";
import BlogCard from "../components/card/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs().then(res => setBlogs(res.data));
  }, []);

  return (
    <div className="blog-grid">
      {blogs.map(blog => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
