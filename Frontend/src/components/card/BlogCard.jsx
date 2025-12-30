import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      <img src={blog.image} alt={blog.title} />
      <h3>{blog.title}</h3>
      <p>{blog.content.substring(0, 100)}...</p>

      <Link to={`/blogs/${blog._id}`}>Read More</Link>
    </div>
  );
};

export default BlogCard;
