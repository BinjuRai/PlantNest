// import api from "../../api/api";
// import { useState } from "react";
// import { toast } from "react-toastify";

// const AddCategory = () => {
//   const [name, setName] = useState("");
//   const [image, setImage] = useState(null);
//   const [video, setVideo] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [videoPreview, setVideoPreview] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Handle file selection
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//     setImagePreview(URL.createObjectURL(file));
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     setVideo(file);
//     setVideoPreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name.trim()) {
//       return toast.error("Category name is required");
//     }

//     const formData = new FormData();
//     formData.append("name", name);
//     if (image) formData.append("image", image);
//     if (video) formData.append("video", video);

//     try {
//       setLoading(true);
//       const { data } = await api.post(
//         "/admin/categories/add-category",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       toast.success("Category created successfully!");
//       // Reset form
//       setName("");
//       setImage(null);
//       setVideo(null);
//       setImagePreview(null);
//       setVideoPreview(null);
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Failed to create category");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-center text-green-800">
//         Add Category 🌿
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Name */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Category Name
//           </label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter category name"
//             className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
//             required
//           />
//         </div>

//         {/* Image Upload */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Category Image
//           </label>
//           <input type="file" accept="image/*" onChange={handleImageChange} />
//           {imagePreview && (
//             <img
//               src={imagePreview}
//               alt="Preview"
//               className="mt-2 w-32 h-32 object-cover rounded-lg"
//             />
//           )}
//         </div>

//         {/* Video Upload */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Category Video
//           </label>
//           <input type="file" accept="video/*" onChange={handleVideoChange} />
//           {videoPreview && (
//             <video
//               src={videoPreview}
//               controls
//               className="mt-2 w-48 h-32 rounded-lg"
//             />
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
//         >
//           {loading ? "Creating..." : "Create Category"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddCategory;
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/api";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file || null);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file || null);
    setVideoPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return toast.error("Category name is required");
    }

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);
    if (video) formData.append("video", video);

    try {
      setLoading(true);
      const { data } = await api.post("/admin/categories/add-category", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Show success toast
      toast.success(`🌿 Category "${name}" created successfully!`);

      // Reset form
      setName("");
      setImage(null);
      setVideo(null);
      setImagePreview(null);
      setVideoPreview(null);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-800">
        Add Category 🌿
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Category Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-lg"
            />
          )}
        </div>

        {/* Video Upload */}
        {/* <div>
          <label className="block text-sm font-medium mb-1">Category Video</label>
          <input type="file" accept="video/*" onChange={handleVideoChange} />
          {videoPreview && (
            <video
              src={videoPreview}
              controls
              className="mt-2 w-48 h-32 rounded-lg"
            />
          )}
        </div> */}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
