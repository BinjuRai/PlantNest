import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";
import { getAdminCategories } from "../../api/categoryApi";

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    plantType: "",
    stock: "",
    careInstructions: "",
    scientificName: "",
    isFeatured: false,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getAdminCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("video/")) {
        toast.error("Please select a video file");
        return;
      }
      if (file.size > 25 * 1024 * 1024) {
        toast.error("Video size should be less than 25MB");
        return;
      }
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.categoryId) {
      return toast.error("Name, price, and category are required!");
    }

    const data = new FormData();
    
    // Append all form fields
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    
    // Append files
    if (imageFile) data.append("imagepath", imageFile);
    if (videoFile) data.append("filepath", videoFile);

    try {
      setLoading(true);
      const response = await api.post("/admin/products/add-product", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      toast.success("✅ Product created successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error("Create product error:", err);
      toast.error(err.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-3xl mx-auto mt-6">
      <h2 className="text-3xl font-bold mb-6 text-green-800 dark:text-green-400">
        🌿 Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Monstera Deliciosa"
            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>

        {/* Scientific Name */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Scientific Name
          </label>
          <input
            name="scientificName"
            value={formData.scientificName}
            onChange={handleChange}
            placeholder="e.g., Monstera deliciosa"
            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Price (Rs) <span className="text-red-500">*</span>
            </label>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="299"
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Stock
            </label>
            <input
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              placeholder="10"
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product description..."
            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 resize-none"
            rows={4}
          />
        </div>

        {/* Category & Plant Type */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
              required
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Plant Type
            </label>
            <select
              name="plantType"
              value={formData.plantType}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">Select Type</option>
              <option value="indoor">Indoor</option>
              <option value="outdoor">Outdoor</option>
              <option value="hanging">Hanging</option>
              <option value="succulent">Succulent</option>
              <option value="flowering">Flowering</option>
            </select>
          </div>
        </div>

        {/* Care Instructions */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Care Instructions
          </label>
          <textarea
            name="careInstructions"
            value={formData.careInstructions}
            onChange={handleChange}
            placeholder="How to care for this plant..."
            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 resize-none"
            rows={3}
          />
        </div>

        {/* Featured */}
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <span className="font-semibold">⭐ Featured Product</span>
        </label>

        {/* Product Image */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Product Image
          </label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange}
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
          {imagePreview && (
            <div className="mt-4 relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview(null);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Product Video */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Product Video (Optional)
          </label>
          <input 
            type="file" 
            accept="video/*" 
            onChange={handleVideoChange}
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
          {videoPreview && (
            <div className="mt-4 relative">
              <video
                src={videoPreview}
                controls
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setVideoFile(null);
                  setVideoPreview(null);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold disabled:opacity-50 transition"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;