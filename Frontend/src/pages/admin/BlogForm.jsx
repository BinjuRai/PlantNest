import { useEffect, useState } from "react";
import { createBlog, getBlog, updateBlog } from "../../services/blogApi";
import { useNavigate, useParams } from "react-router-dom";

const BlogForm = () => {
  const [blog, setBlog] = useState({ title: "", content: "", image: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getBlog(id).then(res => setBlog(res.data));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const action = id
      ? updateBlog(id, blog)
      : createBlog(blog);

    action.then(() => navigate("/admin/blogs"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={blog.title}
        onChange={e => setBlog({ ...blog, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={blog.content}
        onChange={e => setBlog({ ...blog, content: e.target.value })}
      />
      <input
        placeholder="Image URL"
        value={blog.image}
        onChange={e => setBlog({ ...blog, image: e.target.value })}
      />
      <button type="submit">{id ? "Update" : "Create"}</button>
    </form>
  );
};

export default BlogForm;
