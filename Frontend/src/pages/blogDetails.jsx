import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlog } from "../services/blogApi";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    loadBlog();
  }, [id]);

  const loadBlog = async () => {
    try {
      console.log("📡 Fetching blog with ID:", id);
      setLoading(true);

      const res = await getBlog(id);
      console.log("✅ API Response:", res);
      console.log("📊 Response data:", res.data);

      // ✅ FIX: Handle the nested data structure
      const blogData = res.data.data || res.data;
      console.log("📝 Blog data:", blogData);

      setBlog(blogData);
    } catch (err) {
      console.error("❌ Failed to load blog:", err);
      console.error("Error response:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-700 mb-4"></div>
        <p className="text-gray-600 text-lg">Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-xl text-gray-600 mb-4">Blog not found</p>
        <button
          onClick={() => navigate("/blogs")}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          ← Back to Blogs
        </button>
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
        className="mb-6 text-green-700 hover:text-green-800 font-semibold flex items-center gap-2 transition"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Blogs
      </button>

      {/* Blog Content */}
      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Featured Image */}
        {imageUrl && !imgError ? (
          <div className="w-full h-96 overflow-hidden bg-gray-100">
            <img
              src={imageUrl}
              alt={blog.title || "Blog image"}
              className="w-full h-full object-cover"
              onError={() => {
                console.error("Failed to load image:", imageUrl);
                setImgError(true);
              }}
              onLoad={() => console.log("Image loaded successfully:", imageUrl)}
            />
          </div>
        ) : blog.imagepath ? (
          <div className="w-full h-96 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
            <div className="text-center">
              <div className="text-9xl mb-4">📝</div>
              <p className="text-lg text-gray-600 font-medium">
                Image failed to load
              </p>
            </div>
          </div>
        ) : null}

        <div className="p-8">
          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {blog.title || "Untitled Blog"}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-gray-600 mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <span>By {blog.author || "Unknown"}</span>
            </div>

            {blog.createdAt && (
              <>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-lg">
              {blog.content || "No content available"}
            </p>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">
                Tags:
              </h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Back Button (Bottom) */}
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("/blogs")}
          className="inline-flex items-center bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to All Blogs
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
