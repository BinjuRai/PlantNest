import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const imageUrl = blog.imagepath 
    ? `http://localhost:5050/uploads/${blog.imagepath}`
    : null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
      {/* Image */}
      <div className="h-48 w-full relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextElementSibling.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className={`w-full h-full bg-green-100 flex items-center justify-center text-6xl ${
            imageUrl ? "hidden" : ""
          }`}
        >
          📝
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-2">
          {blog.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-2">
          By {blog.author || "Unknown"}
        </p>

        <p className="text-gray-700 mb-4 line-clamp-3">
          {blog.content.substring(0, 150)}...
        </p>

        <Link
          to={`/blogs/${blog._id}`}
          className="inline-block bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
