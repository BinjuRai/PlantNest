

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlog } from "../services/blogApi";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlog();
  }, [id]);

  const loadBlog = async () => {
    try {
      setLoading(true);
      const res = await getBlog(id);
      setBlog(res.data);
    } catch (err) {
      console.error("Failed to load blog:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Blog not found</p>
      </div>
    );
  }

  const imageUrl = blog.imagepath
    ? `http://localhost:5050/uploads/${blog.imagepath}`
    : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Back Button */}
      <button
        onClick={() => navigate("/blogs")}
        className="mb-6 text-green-700 hover:text-green-800 font-semibold flex items-center gap-2"
      >
        ← Back to Blogs
      </button>

      {/* Blog Content */}
      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Featured Image */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={blog.title}
            className="w-full h-96 object-cover"
          />
        )}

        <div className="p-8">
          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {blog.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-gray-600 mb-6 pb-6 border-b">
            <span>By {blog.author || "Unknown"}</span>
            <span>•</span>
            <span>
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {blog.content}
            </p>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">
                Tags:
              </h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default BlogDetails;