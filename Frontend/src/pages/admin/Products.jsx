
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/admin/products");
      setProducts(data.products || data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    
    try {
      await api.delete(`/admin/products/${id}`);
      toast.success(`Product "${name}" deleted`);
      loadProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Products Management
        </h2>
        <Link
          to="/admin/products/add"
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  No products found. Add your first product!
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr 
                  key={p._id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-3">
                    {p.imagepath ? (
                      <img
                        src={`http://localhost:5050/uploads/${p.imagepath}`}
                        alt={p.name}
                        className="w-16 h-16 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextElementSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div className={`w-16 h-16 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center text-2xl ${p.imagepath ? "hidden" : ""}`}>
                      🌿
                    </div>
                  </td>
                  
                  <td className="p-3 font-medium text-gray-900 dark:text-white">
                    {p.name}
                  </td>
                  
                  <td className="p-3 text-gray-700 dark:text-gray-300">
                    Rs. {p.price}
                  </td>
                  
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      p.stock > 10 
                        ? "bg-green-100 text-green-800" 
                        : p.stock > 0 
                        ? "bg-yellow-100 text-yellow-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                    </span>
                  </td>
                  
                  <td className="p-3 text-gray-600 dark:text-gray-300">
                    {p.categoryId?.name || "-"}
                  </td>
                  
                  <td className="p-3 text-center space-x-2">
                    <Link
                      to={`/admin/products/edit/${p._id}`}
                      className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p._id, p.name)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Total Products: <span className="font-semibold">{products.length}</span>
      </div>
    </div>
  );
};

export default Products;