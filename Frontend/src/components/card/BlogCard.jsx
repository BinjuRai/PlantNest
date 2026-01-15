// import { Link } from "react-router-dom";

// const BlogCard = ({ blog }) => {
//   const imageUrl = blog.imagepath
//     ? `http://localhost:5050/uploads/${blog.imagepath}`
//     : null;

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
//       {/* Image */}
//       <div className="h-48 w-full relative">
//         {imageUrl ? (
//           <img
//             src={imageUrl}
//             alt={blog.title}
//             className="w-full h-full object-cover"
//             onError={(e) => {
//               e.target.style.display = "none";
//               e.target.nextElementSibling.style.display = "flex";
//             }}
//           />
//         ) : null}
//         <div
//           className={`w-full h-full bg-green-100 flex items-center justify-center text-6xl ${
//             imageUrl ? "hidden" : ""
//           }`}
//         >
//           📝
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-4">
//         <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-2">
//           {blog.title}
//         </h3>

//         <p className="text-gray-600 text-sm mb-2">
//           By {blog.author || "Unknown"}
//         </p>

//         <p className="text-gray-700 mb-4 line-clamp-3">
//           {blog.content.substring(0, 150)}...
//         </p>

//         <Link
//           to={`/blogs/${blog._id}`}
//           className="inline-block bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-semibold transition"
//         >
//           Read More →
//         </Link>
//       </div>
//     </div>
//   );
// };

// // export default BlogCard;
// import { Link } from "react-router-dom";
// import { useState } from "react";

// const BlogCard = ({ blog = {} }) => {
//   const [imgError, setImgError] = useState(false);

//   const imageUrl = blog.imagepath
//     ? `http://localhost:5050/uploads/${blog.imagepath}`
//     : null;

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
//       {/* Image */}
//       <div className="h-48 w-full relative">
//         {imageUrl && !imgError ? (
//           <img
//             src={imageUrl}
//             alt={blog.title || "Blog image"}
//             className="w-full h-full object-cover"
//             onError={() => setImgError(true)}
//           />
//         ) : (
//           <div className="w-full h-full bg-green-100 flex items-center justify-center text-6xl">
//             📝
//           </div>
//         )}
//       </div>

//       {/* Content */}
//       <div className="p-4">
//         <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-2">
//           {blog.title || "Untitled Blog"}
//         </h3>

//         <p className="text-gray-600 text-sm mb-2">
//           By {blog.author || "Unknown"}
//         </p>

//         <p className="text-gray-700 mb-4 line-clamp-3">
//           {blog.content
//             ? `${blog.content.substring(0, 150)}...`
//             : "No content available"}
//         </p>

//         {blog._id && (
//           <Link
//             to={`/blogs/${blog._id}`}
//             className="inline-block bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-semibold transition"
//           >
//             Read More →
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogCard;

// import { Link } from "react-router-dom";
// import { useState } from "react";

// const BlogCard = ({ blog = {} }) => {
//   const [imgError, setImgError] = useState(false);

//   // Construct image URL only if imagepath exists
//   const imageUrl = blog?.imagepath ? `http://localhost:5050/uploads/${blog.imagepath}` : null;

//   // Fallback image div
//   const fallbackImage = (
//     <div className="w-full h-full bg-green-100 flex items-center justify-center text-6xl">
//       📝
//     </div>
//   );

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
//       {/* Image */}
//       <div className="h-48 w-full relative">
//         {imageUrl && !imgError ? (
//           <img
//             src={imageUrl}
//             alt={blog.title || "Blog image"}
//             className="w-full h-full object-cover"
//             onError={() => setImgError(true)}
//           />
//         ) : (
//           fallbackImage
//         )}
//       </div>

//       {/* Content */}
//       <div className="p-4">
//         <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-2">
//           {blog.title || "Untitled Blog"}
//         </h3>

//         <p className="text-gray-600 text-sm mb-2">
//           By {blog.author || "Unknown"}
//         </p>

//         <p className="text-gray-700 mb-4 line-clamp-3">
//           {blog.content
//             ? `${blog.content.substring(0, 150)}...`
//             : "No content available"}
//         </p>

//         {blog._id && (
//           <Link
//             to={`/blogs/${blog._id}`}
//             className="inline-block bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-semibold transition"
//           >
//             Read More →
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogCard;
import { Link } from "react-router-dom";
import { useState } from "react";

const BlogCard = ({ blog = {} }) => {
  const [imgError, setImgError] = useState(false);

  // Construct the full image URL
  const getImageUrl = () => {
    if (!blog.imagepath) return null;

    // If already a full URL
    if (blog.imagepath.startsWith("http")) {
      return blog.imagepath;
    }

    // Construct URL - backend serves from /uploads
    return `http://localhost:5050/uploads/${blog.imagepath}`;
  };

  const imageUrl = getImageUrl();

  // Fallback image component
  const FallbackImage = () => (
    <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-2">📝</div>
        <p className="text-sm text-gray-600 font-medium">No Image</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col">
      {/* Image Section */}
      <div className="h-48 w-full relative overflow-hidden bg-gray-100">
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt={blog.title || "Blog image"}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={() => {
              console.error("Failed to load image:", imageUrl);
              setImgError(true);
            }}
            onLoad={() => console.log("Image loaded successfully:", imageUrl)}
          />
        ) : (
          <FallbackImage />
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="font-bold text-xl text-gray-800 mb-3 line-clamp-2 hover:text-green-700 transition-colors">
          {blog.title || "Untitled Blog"}
        </h3>

        {/* Author & Date */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            {blog.author || "Unknown"}
          </span>
          {blog.createdAt && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          )}
        </div>

        {/* Content Preview */}
        <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">
          {blog.content
            ? blog.content.length > 150
              ? `${blog.content.substring(0, 150)}...`
              : blog.content
            : "No content available"}
        </p>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Read More Button */}
        {blog._id && (
          <Link
            to={`/blogs/${blog._id}`}
            className="inline-flex items-center justify-center bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors duration-200 mt-auto"
          >
            Read More
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
