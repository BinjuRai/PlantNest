
import { useEffect, useState } from "react";
import { getBlogs } from "../services/blogApi";
import BlogCard from "../components/card/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("🔄 Blogs component mounted");
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      console.log("📡 Fetching blogs from API...");
      setLoading(true);
      setError(null);

      const res = await getBlogs();
      console.log("✅ API Response:", res);
      console.log("📊 Response Data:", res.data);
      console.log("📝 Blogs Array:", res.data.data);

      const blogsData = res.data.data || [];
      setBlogs(blogsData);

      console.log(`✅ Loaded ${blogsData.length} blogs`);

      // Log each blog's image status
      blogsData.forEach((blog, index) => {
        console.log(`Blog ${index + 1}:`, {
          title: blog.title,
          imagepath: blog.imagepath,
          hasImage: !!blog.imagepath,
          fullImageUrl: blog.imagepath
            ? `http://localhost:5050/uploads/${blog.imagepath}`
            : "No image",
        });
      });
    } catch (err) {
      console.error("❌ Failed to load blogs:", err);
      console.error("Error details:", err.response?.data || err.message);
      setError(err.message);
    } finally {
      setLoading(false);
      console.log("✅ Loading complete");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-700 mb-4"></div>
        <p className="text-gray-600 text-lg">Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-bold text-xl mb-2">
            Error Loading Blogs
          </h3>
          <p className="text-red-600">{error}</p>
          <button
            onClick={loadBlogs}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl secondary-font font-semibold text-gray-800  mb-2">
          Our Blog
        </h1>
        <p className="text-gray-600 secondary-font">
          Discover insights, stories, and updates from our team
        </p>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-xl mb-2">No blogs available yet</p>
          <p className="text-gray-400">Check back soon for new content!</p>
        </div>
      ) : (
        <>
          <div className="text-center text-gray-600 mb-6">
            Showing {blogs.length} {blogs.length === 1 ? "blog" : "blogs"}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => {
              console.log(`🎨 Rendering blog ${index + 1}:`, blog.title);
              return <BlogCard key={blog._id || index} blog={blog} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Blogs;
