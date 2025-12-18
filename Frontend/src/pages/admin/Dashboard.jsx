import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/products"
          className="bg-white p-6 shadow rounded hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold">Manage Products</h3>
          <p className="text-gray-600">Add, edit, delete products</p>
        </Link>

        <Link
          to="/admin/categories"
          className="bg-white p-6 shadow rounded hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold">Manage Categories</h3>
          <p className="text-gray-600">Create & delete categories</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
