// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../auth/authProvider";

// const AdminNavbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
//       {/* Left */}
//       <div className="flex items-center gap-3">
//         <h1 className="text-xl font-semibold text-gray-800">
//           Admin Panel
//         </h1>
//       </div>

//       {/* Right */}
//       <div className="flex items-center gap-4">
//         <div className="text-sm text-gray-600">
//           {user?.email}
//         </div>

//         <button
//           onClick={handleLogout}
//           className="px-4 py-2 rounded bg-red-500 text-white text-sm hover:bg-red-600 transition"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// };

// export default AdminNavbar;

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/authProvider";
import { useState } from "react";

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 bg-gradient-to-r from-green-600 to-teal-600 shadow-lg flex items-center justify-between px-6 sticky top-0 z-50">
      {/* Left - Logo & Title */}
      <div className="flex items-center gap-3">
        <div className="bg-white rounded-lg p-2 shadow-md">
          <span className="text-2xl">🌿</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">
            Plant Store Admin
          </h1>
          <p className="text-xs text-green-100">
            Management Dashboard
          </p>
        </div>
      </div>

      {/* Center - Search (Optional) */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search products, categories..."
            className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-green-100 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <span className="absolute right-3 top-2.5 text-green-100">🔍</span>
        </div>
      </div>

      {/* Right - User Info & Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg bg-white/20 hover:bg-white/30 transition">
          <span className="text-xl">🔔</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            3
          </span>
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 bg-white/20 hover:bg-white/30 rounded-lg px-4 py-2 transition"
          >
            <div className="w-8 h-8 rounded-full bg-green-300 flex items-center justify-center font-bold text-green-800">
              {user?.email?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-sm font-semibold text-white">
                {user?.name || "Admin"}
              </p>
              <p className="text-xs text-green-100">
                {user?.email || "admin@plantstore.com"}
              </p>
            </div>
            <span className="text-white">▼</span>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-800 dark:text-white">
                  {user?.email}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Administrator
                </p>
              </div>
              
              <button
                onClick={() => navigate("/admin/profile")}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
              >
                <span>👤</span> My Profile
              </button>
              
              <button
                onClick={() => navigate("/admin/settings")}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
              >
                <span>⚙️</span> Settings
              </button>
              
              <div className="border-t border-gray-200 dark:border-gray-700 mt-2"></div>
              
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 font-semibold"
              >
                <span>🚪</span> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;