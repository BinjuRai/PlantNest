
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lowStockProducts: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch products
      const productsRes = await api.get("/admin/products");
      const products = productsRes.data.products || productsRes.data;
      
      // Fetch categories
      const categoriesRes = await api.get("/admin/categories");
      const categories = categoriesRes.data.categories || categoriesRes.data;

      // Calculate stats
      const lowStock = products.filter(p => p.stock < 5).length;

      setStats({
        totalProducts: products.length,
        totalCategories: categories.length,
        totalOrders: 0, // You can add this when you have orders
        totalRevenue: 0, // You can calculate this from orders
        lowStockProducts: lowStock,
        recentOrders: []
      });
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-700"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-green-800 dark:text-green-400 mb-2">
          🌿 Plant Store Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Products */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold uppercase">
                Total Products
              </p>
              <h3 className="text-4xl font-bold text-gray-800 dark:text-white mt-2">
                {stats.totalProducts}
              </h3>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full">
              <span className="text-4xl">🌱</span>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              to="/admin/products" 
              className="text-green-600 dark:text-green-400 text-sm font-semibold hover:underline"
            >
              View all products →
            </Link>
          </div>
        </div>

        {/* Total Categories */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold uppercase">
                Categories
              </p>
              <h3 className="text-4xl font-bold text-gray-800 dark:text-white mt-2">
                {stats.totalCategories}
              </h3>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
              <span className="text-4xl">📦</span>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              to="/admin/categories" 
              className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline"
            >
              Manage categories →
            </Link>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold uppercase">
                Low Stock
              </p>
              <h3 className="text-4xl font-bold text-gray-800 dark:text-white mt-2">
                {stats.lowStockProducts}
              </h3>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-full">
              <span className="text-4xl">⚠️</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-yellow-600 dark:text-yellow-400 text-sm font-semibold">
              Items below 5 units
            </p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold uppercase">
                Total Orders
              </p>
              <h3 className="text-4xl font-bold text-gray-800 dark:text-white mt-2">
                {stats.totalOrders}
              </h3>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full">
              <span className="text-4xl">🛒</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-purple-600 dark:text-purple-400 text-sm font-semibold">
              All time orders
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          ⚡ Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/products/add"
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-3">
              <span className="text-3xl">➕</span>
              <div>
                <h3 className="font-bold text-lg">Add Product</h3>
                <p className="text-sm text-green-100">Create new listing</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/categories/add"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🏷️</span>
              <div>
                <h3 className="font-bold text-lg">Add Category</h3>
                <p className="text-sm text-blue-100">Organize products</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-3">
              <span className="text-3xl">📋</span>
              <div>
                <h3 className="font-bold text-lg">View Orders</h3>
                <p className="text-sm text-purple-100">Manage orders</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/customers"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-3">
              <span className="text-3xl">👥</span>
              <div>
                <h3 className="font-bold text-lg">Customers</h3>
                <p className="text-sm text-orange-100">User management</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Management */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              🌿 Product Management
            </h2>
            <Link 
              to="/admin/products" 
              className="text-green-600 dark:text-green-400 font-semibold hover:underline"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📊</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Inventory Status
                </span>
              </div>
              <span className="text-green-600 dark:text-green-400 font-bold">
                {stats.totalProducts} items
              </span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">⚠️</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Low Stock Items
                </span>
              </div>
              <span className="text-yellow-600 dark:text-yellow-400 font-bold">
                {stats.lowStockProducts} items
              </span>
            </div>

            <Link
              to="/admin/products"
              className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-lg font-semibold transition"
            >
              Manage All Products
            </Link>
          </div>
        </div>

        {/* Category Management */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              📦 Category Management
            </h2>
            <Link 
              to="/admin/categories" 
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🏷️</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Total Categories
                </span>
              </div>
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                {stats.totalCategories} categories
              </span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎯</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Organization
                </span>
              </div>
              <span className="text-purple-600 dark:text-purple-400 font-bold">
                Active
              </span>
            </div>

            <Link
              to="/admin/categories"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-semibold transition"
            >
              Manage Categories
            </Link>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex items-start space-x-4">
          <span className="text-4xl">💡</span>
          <div>
            <h3 className="text-2xl font-bold mb-2">Pro Tip</h3>
            <p className="text-green-50">
              Keep your inventory updated regularly! Products with low stock ({stats.lowStockProducts} items) 
              should be restocked soon to avoid running out of popular plants.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;