// import { NavLink } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <aside style={{ width: "220px", background: "#111", color: "#fff" }}>
//       <h3 style={{ padding: "1rem" }}>Admin</h3>

//       <nav>
//         <NavLink to="/admin" end>Dashboard</NavLink>
//         <NavLink to="/admin/products">Products</NavLink>
//         <NavLink to="/admin/categories">Categories</NavLink>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;

import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      path: "/admin",
      icon: "📊",
      label: "Dashboard",
      end: true,
    },
    {
      path: "/admin/products",
      icon: "🌱",
      label: "Products",
      badge: null,
    },
    {
      path: "/admin/blogs",
      icon: "📝",
      label: "Blogs",
      badge: null,
    },
    {
      path: "/admin/categories",
      icon: "📦",
      label: "Categories",
      badge: null,
    },
    {
      path: "/admin/orders",
      icon: "🛒",
      label: "Orders",
      badge: "3",
    },
    {
      path: "/admin/customers",
      icon: "👥",
      label: "Customers",
      badge: null,
    },
    {
      path: "/admin/analytics",
      icon: "📈",
      label: "Analytics",
      badge: null,
    },
    {
      path: "/admin/settings",
      icon: "⚙️",
      label: "Settings",
      badge: null,
    },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen transition-all duration-300 shadow-2xl relative`}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-green-600 hover:bg-green-700 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg z-10 transition"
      >
        {isCollapsed ? "→" : "←"}
      </button>

      {/* Logo/Header Section */}
      <div className="p-6 border-b border-gray-700">
        {!isCollapsed ? (
          <div className="flex items-center gap-3">
            <div className="bg-green-600 rounded-lg p-2">
              <span className="text-2xl">🌿</span>
            </div>
            <div>
              <h3 className="font-bold text-lg">Plant Store</h3>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="bg-green-600 rounded-lg p-2">
              <span className="text-2xl">🌿</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative ${
                isActive
                  ? "bg-green-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active Indicator */}
                {isActive && !isCollapsed && (
                  <div className="absolute left-0 w-1 h-8 bg-white rounded-r-full"></div>
                )}

                {/* Icon */}
                <span className={`text-2xl ${isCollapsed ? "mx-auto" : ""}`}>
                  {item.icon}
                </span>

                {/* Label */}
                {!isCollapsed && (
                  <span className="font-semibold flex-1">{item.label}</span>
                )}

                {/* Badge */}
                {!isCollapsed && item.badge && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl">
                    {item.label}
                    {item.badge && (
                      <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Quick Stats (if not collapsed) */}
      {!isCollapsed && (
        <div className="absolute bottom-6 left-4 right-4 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg p-4">
          <div className="text-center">
            <p className="text-xs text-green-100 mb-1">Store Status</p>
            <p className="text-2xl font-bold">🟢 Online</p>
            <p className="text-xs text-green-100 mt-1">
              All systems operational
            </p>
          </div>
        </div>
      )}

      {/* Mini indicator when collapsed */}
      {isCollapsed && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <div className="bg-green-500 rounded-full w-3 h-3 animate-pulse"></div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
