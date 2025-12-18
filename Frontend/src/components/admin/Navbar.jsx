import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/authProvider";

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-gray-800">
          Admin Panel
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-600">
          {user?.email}
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded bg-red-500 text-white text-sm hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
