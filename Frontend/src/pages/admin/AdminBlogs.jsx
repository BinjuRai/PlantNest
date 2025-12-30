import { useEffect, useState } from "react";
import { getBlogs, deleteBlog } from "../../services/blogApi";
import { Link } from "react-router-dom";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const loadBlogs = () =>
    getBlogs().then(res => setBlogs(res.data));

  useEffect(() => {
    loadBlogs();
  }, []);

  return (
    <div>
      <Link to="/admin/create">Create Blog</Link>

      {blogs.map(blog => (
        <div key={blog._id}>
          <h3>{blog.title}</h3>
          <Link to={`/admin/edit/${blog._id}`}>Edit</Link>
          <button onClick={() => {
            deleteBlog(blog._id).then(loadBlogs);
          }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminBlogs;
