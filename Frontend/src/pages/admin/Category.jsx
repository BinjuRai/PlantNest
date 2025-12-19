
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAdminCategories, deleteCategory } from "../../api/categoryApi";
import AddCategory from "../../pages/admin/AddCategory";

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await getAdminCategories();
      setCategories(data);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle delete
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      await deleteCategory(id);
      toast.success(`Category "${name}" deleted`);
      fetchCategories();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete category");
    }
  };

  // Handle edit navigation
  const handleEdit = (id) => {
    navigate(`/admin/categories/edit/${id}`);
  };

  // Handle successful creation
  const handleCategoryCreated = () => {
    setShowAddForm(false);
    fetchCategories();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Categories Management
        </h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          {showAddForm ? "Cancel" : "+ Add Category"}
        </button>
      </div>

      {/* Add Category Form */}
      {showAddForm && (
        <div className="mb-8">
          <AddCategory onSuccess={handleCategoryCreated} />
        </div>
      )}

      {/* Categories Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Image</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Created</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No categories found. Add your first category!
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr
                    key={category._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="px-6 py-4">
                      {category.imagepath ? (
                        <img
                          src={`http://localhost:5050/uploads/${category.imagepath}`}
                          alt={category.name}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextElementSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div className={`w-16 h-16 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center text-2xl ${category.imagepath ? "hidden" : ""}`}>
                        🌿
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300 max-w-xs truncate">
                      {category.description || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(category.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(category._id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category._id, category.name)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Total Categories: <span className="font-semibold">{categories.length}</span>
      </div>
    </div>
  );
};

export default Categories;