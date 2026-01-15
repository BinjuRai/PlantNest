// // import { useEffect, useState } from "react";
// // import { createBlog, getBlog, updateBlog } from "../../services/blogApi";
// // import { useNavigate, useParams } from "react-router-dom";

// // const BlogForm = () => {
// //   const [blog, setBlog] = useState({ title: "", content: "", image: "" });
// //   const { id } = useParams();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (id) {
// //       getBlog(id).then(res => setBlog(res.data));
// //     }
// //   }, [id]);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     const action = id
// //       ? updateBlog(id, blog)
// //       : createBlog(blog);

// //     action.then(() => navigate("/admin/blogs"));
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <input
// //         placeholder="Title"
// //         value={blog.title}
// //         onChange={e => setBlog({ ...blog, title: e.target.value })}
// //       />
// //       <textarea
// //         placeholder="Content"
// //         value={blog.content}
// //         onChange={e => setBlog({ ...blog, content: e.target.value })}
// //       />
// //       <input
// //         placeholder="Image URL"
// //         value={blog.image}
// //         onChange={e => setBlog({ ...blog, image: e.target.value })}
// //       />
// //       <button type="submit">{id ? "Update" : "Create"}</button>
// //     </form>
// //   );
// // };

// // // export default BlogForm;
// // import { useEffect, useState } from "react";
// // import { createBlog, getBlog, updateBlog } from "../../services/blogApi";
// // import { useNavigate, useParams } from "react-router-dom";

// // const BlogForm = () => {
// //   const [blog, setBlog] = useState({
// //     title: "",
// //     content: "",
// //     image: "",
// //     author: "",
// //   });

// //   const { id } = useParams();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (id) {
// //       getBlog(id).then((res) => setBlog(res.data));
// //     }
// //   }, [id]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!blog.title || !blog.content || !blog.author) {
// //       return alert("Title, content, and author are required");
// //     }

// //     if (id) {
// //       await updateBlog(id, blog);
// //     } else {
// //       await createBlog(blog);
// //     }

// //     navigate("/admin/blogs");
// //   };

// //   return (
// //     <div className="max-w-3xl mx-auto p-6">
// //       <div className="bg-white shadow-lg rounded-xl p-6">
// //         <h2 className="text-3xl font-bold mb-6">
// //           {id ? "✏️ Edit Blog" : "📝 Create Blog"}
// //         </h2>

// //         <form onSubmit={handleSubmit} className="space-y-5">
// //           {/* Title */}
// //           <input
// //             placeholder="Blog title"
// //             value={blog.title}
// //             onChange={(e) =>
// //               setBlog({ ...blog, title: e.target.value })
// //             }
// //             className="w-full px-4 py-2 border rounded-lg"
// //           />

// //           {/* Author */}
// //           <input
// //             placeholder="Author name"
// //             value={blog.author}
// //             onChange={(e) =>
// //               setBlog({ ...blog, author: e.target.value })
// //             }
// //             className="w-full px-4 py-2 border rounded-lg"
// //           />

// //           {/* Content */}
// //           <textarea
// //             placeholder="Blog content..."
// //             rows={6}
// //             value={blog.content}
// //             onChange={(e) =>
// //               setBlog({ ...blog, content: e.target.value })
// //             }
// //             className="w-full px-4 py-2 border rounded-lg resize-none"
// //           />

// //           {/* Image */}
// //           <input
// //             placeholder="Image URL (optional)"
// //             value={blog.image}
// //             onChange={(e) =>
// //               setBlog({ ...blog, image: e.target.value })
// //             }
// //             className="w-full px-4 py-2 border rounded-lg"
// //           />

// //           {blog.image && (
// //             <img
// //               src={blog.image}
// //               alt="Preview"
// //               className="w-full h-64 object-cover rounded-lg"
// //             />
// //           )}

// //           {/* Submit */}
// //           <button
// //             type="submit"
// //             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
// //           >
// //             {id ? "Update Blog" : "Create Blog"}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // // export default BlogForm;
// // import { useEffect, useState } from "react";
// // import { createBlog, getBlog, updateBlog } from "../../services/blogApi";
// // import { useNavigate, useParams } from "react-router-dom";

// // const BlogForm = () => {
// //   const [blog, setBlog] = useState({ title: "", content: "", author: "", image: "" });
// //   const [imagePreview, setImagePreview] = useState(null);
// //   const { id } = useParams();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (id) {
// //       getBlog(id).then(res => {
// //         setBlog(res.data);
// //         setImagePreview(res.data.image);
// //       });
// //     }
// //   }, [id]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const formData = new FormData();
// //       formData.append("title", blog.title);
// //       formData.append("content", blog.content);
// //       formData.append("author", blog.author);
// //       if (blog.image instanceof File) {
// //         formData.append("image", blog.image);
// //       }

// //       const action = id
// //         ? updateBlog(id, formData)
// //         : createBlog(formData);

// //       await action;
// //       navigate("/admin/blogs");
// //     } catch (error) {
// //       console.error(error);
// //       alert("Error submitting blog");
// //     }
// //   };

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     setBlog({ ...blog, image: file });
// //     setImagePreview(URL.createObjectURL(file));
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <input
// //         placeholder="Title"
// //         value={blog.title}
// //         onChange={e => setBlog({ ...blog, title: e.target.value })}
// //         required
// //       />
// //       <input
// //         placeholder="Author"
// //         value={blog.author}
// //         onChange={e => setBlog({ ...blog, author: e.target.value })}
// //         required
// //       />
// //       <textarea
// //         placeholder="Content"
// //         value={blog.content}
// //         onChange={e => setBlog({ ...blog, content: e.target.value })}
// //         required
// //       />
// //       <input type="file" onChange={handleImageChange} />
// //       {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: "200px" }} />}
// //       <button type="submit">{id ? "Update" : "Create"}</button>
// //     </form>
// //   );
// // };

// // export default BlogForm;
// // import { useEffect, useState } from "react";
// // import { createBlog, getBlog, updateBlog } from "../../services/blogApi";
// // import { useNavigate, useParams } from "react-router-dom";

// // const BlogForm = () => {
// //   const [blog, setBlog] = useState({
// //     title: "",
// //     content: "",
// //     author: "",
// //     image: "",
// //   });
// //   const [imagePreview, setImagePreview] = useState(null);
// //   const { id } = useParams();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (id) {
// //       getBlog(id).then((res) => {
// //         setBlog(res.data);
// //         setImagePreview(res.data.image);
// //       });
// //     }
// //   }, [id]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!blog.title || !blog.content || !blog.author) {
// //       return alert("Title, content, and author are required");
// //     }

// //     try {
// //       const formData = new FormData();
// //       formData.append("title", blog.title);
// //       formData.append("content", blog.content);
// //       formData.append("author", blog.author);

// //       if (blog.image instanceof File) {
// //         formData.append("image", blog.image);
// //       } else if (typeof blog.image === "string") {
// //         formData.append("image", blog.image);
// //       }

// //       if (id) {
// //         await updateBlog(id, formData);
// //       } else {
// //         await createBlog(formData);
// //       }

// //       navigate("/admin/blogs");
// //     } catch (error) {
// //       console.error("Error submitting blog:", error);
// //       alert("Error submitting blog");
// //     }
// //   };

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setBlog({ ...blog, image: file });
// //       setImagePreview(URL.createObjectURL(file));
// //     }
// //   };

// //   return (
// //     <div className="max-w-3xl mx-auto p-6">
// //       <div className="bg-white shadow-lg rounded-xl p-6">
// //         <h2 className="text-3xl font-bold mb-6">
// //           {id ? "✏️ Edit Blog" : "📝 Create Blog"}
// //         </h2>

// //         <form onSubmit={handleSubmit} className="space-y-5">
// //           {/* Title */}
// //           <input
// //             placeholder="Blog title"
// //             value={blog.title}
// //             onChange={(e) => setBlog({ ...blog, title: e.target.value })}
// //             className="w-full px-4 py-2 border rounded-lg"
// //             required
// //           />

// //           {/* Author */}
// //           <input
// //             placeholder="Author name"
// //             value={blog.author}
// //             onChange={(e) => setBlog({ ...blog, author: e.target.value })}
// //             className="w-full px-4 py-2 border rounded-lg"
// //             required
// //           />

// //           {/* Content */}
// //           <textarea
// //             placeholder="Blog content..."
// //             rows={6}
// //             value={blog.content}
// //             onChange={(e) => setBlog({ ...blog, content: e.target.value })}
// //             className="w-full px-4 py-2 border rounded-lg resize-none"
// //             required
// //           />

// //           {/* Image Upload */}
// //           <div>
// //             <input
// //               type="file"
// //               accept="image/*"
// //               onChange={handleImageChange}
// //               className="mb-2"
// //             />
// //             {imagePreview && (
// //               <img
// //                 src={imagePreview}
// //                 alt="Preview"
// //                 className="w-full h-64 object-cover rounded-lg"
// //               />
// //             )}
// //           </div>

// //           {/* Submit */}
// //           <button
// //             type="submit"
// //             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
// //           >
// //             {id ? "Update Blog" : "Create Blog"}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BlogForm;

// import { useEffect, useState } from "react";
// import { createBlog, getAdminBlog, updateBlog } from "../../services/blogApi"; // ✅ Use getAdminBlog
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";

// const BlogForm = () => {
//   const [blog, setBlog] = useState({
//     title: "",
//     content: "",
//     author: "",
//     image: "",
//   });
//   const [imagePreview, setImagePreview] = useState(null);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id) {
//       getAdminBlog(id).then((res) => { // ✅ Changed from getBlog
//         setBlog(res.data);
//         setImagePreview(res.data.image);
//       });
//     }
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!blog.title || !blog.content || !blog.author) {
//       toast.error("Title, content, and author are required");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("title", blog.title);
//       formData.append("content", blog.content);
//       formData.append("author", blog.author);

//       if (blog.image instanceof File) {
//         formData.append("image", blog.image);
//       }

//       if (id) {
//         await updateBlog(id, formData);
//         toast.success("Blog updated successfully!");
//       } else {
//         await createBlog(formData);
//         toast.success("Blog created successfully!");
//       }

//       navigate("/admin/blogs");
//     } catch (error) {
//       console.error("Error submitting blog:", error);
//       toast.error("Error submitting blog");
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setBlog({ ...blog, image: file });
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <div className="bg-white shadow-lg rounded-xl p-6">
//         <h2 className="text-3xl font-bold mb-6">
//           {id ? "✏️ Edit Blog" : "📝 Create Blog"}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             placeholder="Blog title"
//             value={blog.title}
//             onChange={(e) => setBlog({ ...blog, title: e.target.value })}
//             className="w-full px-4 py-2 border rounded-lg"
//             required
//           />

//           <input
//             placeholder="Author name"
//             value={blog.author}
//             onChange={(e) => setBlog({ ...blog, author: e.target.value })}
//             className="w-full px-4 py-2 border rounded-lg"
//             required
//           />

//           <textarea
//             placeholder="Blog content..."
//             rows={6}
//             value={blog.content}
//             onChange={(e) => setBlog({ ...blog, content: e.target.value })}
//             className="w-full px-4 py-2 border rounded-lg resize-none"
//             required
//           />

//           <div>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="mb-2"
//             />
//             {imagePreview && (
//               <img
//                 src={imagePreview}
//                 alt="Preview"
//                 className="w-full h-64 object-cover rounded-lg"
//               />
//             )}
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
//           >
//             {id ? "Update Blog" : "Create Blog"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BlogForm;

// import { useEffect, useState } from "react";
// import { createBlog, getAdminBlog, updateBlog } from "../../services/blogApi";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";

// const BlogForm = () => {
//   const [blog, setBlog] = useState({
//     title: "",
//     content: "",
//     author: "",
//     image: "",
//   });
//   const [imagePreview, setImagePreview] = useState(null);
//   const [imgError, setImgError] = useState(false); // ✅ handle broken preview
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id) {
//       getAdminBlog(id)
//         .then((res) => {
//           const data = res.data;
//           setBlog({
//             title: data.title || "",
//             content: data.content || "",
//             author: data.author || "",
//             image: null, // Reset file input
//           });

//           if (data.imagepath) {
//             setImagePreview(`http://localhost:5050/uploads/${data.imagepath}`);
//           } else {
//             setImagePreview(null);
//           }
//         })
//         .catch((err) => {
//           console.error("Error fetching blog:", err);
//           toast.error("Failed to load blog data");
//         });
//     }
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!blog.title || !blog.content || !blog.author) {
//       toast.error("Title, content, and author are required");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("title", blog.title);
//       formData.append("content", blog.content);
//       formData.append("author", blog.author);

//       if (blog.image instanceof File) {
//         formData.append("image", blog.image);
//       }

//       if (id) {
//         await updateBlog(id, formData);
//         toast.success("Blog updated successfully!");
//       } else {
//         await createBlog(formData);
//         toast.success("Blog created successfully!");
//       }

//       navigate("/admin/blogs");
//     } catch (error) {
//       console.error("Error submitting blog:", error);
//       toast.error("Error submitting blog");
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setBlog({ ...blog, image: file });
//       setImagePreview(URL.createObjectURL(file));
//       setImgError(false); // reset error if new image chosen
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <div className="bg-white shadow-lg rounded-xl p-6">
//         <h2 className="text-3xl font-bold mb-6">
//           {id ? "✏️ Edit Blog" : "📝 Create Blog"}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Title */}
//           <input
//             placeholder="Blog title"
//             value={blog.title}
//             onChange={(e) => setBlog({ ...blog, title: e.target.value })}
//             className="w-full px-4 py-2 border rounded-lg"
//             required
//           />

//           {/* Author */}
//           <input
//             placeholder="Author name"
//             value={blog.author}
//             onChange={(e) => setBlog({ ...blog, author: e.target.value })}
//             className="w-full px-4 py-2 border rounded-lg"
//             required
//           />

//           {/* Content */}
//           <textarea
//             placeholder="Blog content..."
//             rows={6}
//             value={blog.content}
//             onChange={(e) => setBlog({ ...blog, content: e.target.value })}
//             className="w-full px-4 py-2 border rounded-lg resize-none"
//             required
//           />

//           {/* Image Upload */}
//           <div>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="mb-2"
//             />
//             {imagePreview ? (
//               <img
//                 src={imagePreview}
//                 alt="Preview"
//                 onError={() => setImgError(true)}
//                 className="w-full h-64 object-cover rounded-lg"
//                 style={{ display: imgError ? "none" : "block" }}
//               />
//             ) : (
//               <div className="w-full h-64 bg-green-100 flex items-center justify-center text-6xl rounded-lg">
//                 📝
//               </div>
//             )}
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
//           >
//             {id ? "Update Blog" : "Create Blog"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BlogForm;

import { useEffect, useState } from "react";
import { createBlog, getAdminBlog, updateBlog } from "../../services/blogApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const BlogForm = () => {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    author: "",
    tags: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingBlog, setFetchingBlog] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setFetchingBlog(true);
      getAdminBlog(id)
        .then((res) => {
          console.log("Fetched blog data:", res.data);
          const data = res.data.data || res.data;

          setBlog({
            title: data.title || "",
            content: data.content || "",
            author: data.author || "",
            tags: data.tags ? data.tags.join(", ") : "",
          });

          if (data.imagepath) {
            const imageUrl = `http://localhost:5050/uploads/${data.imagepath}`;
            setImagePreview(imageUrl);
            console.log("Existing image:", imageUrl);
          }
        })
        .catch((err) => {
          console.error("Error fetching blog:", err);
          toast.error("Failed to load blog data");
        })
        .finally(() => {
          setFetchingBlog(false);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!blog.title || !blog.content || !blog.author) {
      toast.error("Title, content, and author are required");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("content", blog.content);
      formData.append("author", blog.author);

      if (blog.tags) {
        formData.append("tags", blog.tags);
      }

      // Only append image if a new file was selected
      if (imageFile) {
        formData.append("image", imageFile);
        console.log("Uploading image:", imageFile.name);
      }

      // Log FormData contents for debugging
      console.log("Submitting form data:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      if (id) {
        await updateBlog(id, formData);
        toast.success("Blog updated successfully!");
      } else {
        await createBlog(formData);
        toast.success("Blog created successfully!");
      }

      navigate("/admin/blogs");
    } catch (error) {
      console.error("Error submitting blog:", error);
      console.error("Error response:", error.response?.data);
      toast.error(error.response?.data?.message || "Error submitting blog");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      console.log(
        "Selected image:",
        file.name,
        "Size:",
        (file.size / 1024).toFixed(2),
        "KB"
      );
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  if (fetchingBlog) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          {id ? "✏️ Edit Blog" : "📝 Create New Blog"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              placeholder="Enter blog title"
              value={blog.title}
              onChange={(e) => setBlog({ ...blog, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Author *
            </label>
            <input
              type="text"
              placeholder="Enter author name"
              value={blog.author}
              onChange={(e) => setBlog({ ...blog, author: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              placeholder="e.g., technology, design, tutorial"
              value={blog.tags}
              onChange={(e) => setBlog({ ...blog, tags: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              placeholder="Write your blog content here..."
              rows={10}
              value={blog.content}
              onChange={(e) => setBlog({ ...blog, content: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Featured Image
            </label>

            {!imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="text-6xl mb-2">📷</div>
                  <p className="text-gray-600 mb-1">Click to upload an image</p>
                  <p className="text-sm text-gray-400">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </label>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-80 object-cover rounded-lg"
                  onError={(e) => {
                    console.error("Image preview failed to load");
                    e.target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3Ctext fill='%23666' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EImage Failed to Load%3C/text%3E%3C/svg%3E";
                  }}
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg font-semibold"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/blogs")}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {id ? "Updating..." : "Creating..."}
                </span>
              ) : id ? (
                "Update Blog"
              ) : (
                "Create Blog"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
