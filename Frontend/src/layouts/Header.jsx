// import { NavLink, useNavigate } from "react-router-dom";
// import React, { useContext } from "react";
// import { AuthContext } from "../auth/authProvider";
// import {
//   Facebook,
//   Instagram,
//   Youtube,
//   ShoppingCart,
//   Bell,
//   User,
// } from "lucide-react";

// const Header = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const navItemClass = ({ isActive }) =>
//     `cursor-pointer transition ${
//       isActive ? "text-green-800 font-bold" : "hover:text-green-700"
//     }`;

//   return (
//     <header>
//       {/* TOP SOCIAL BAR */}
//       <div className="bg-[#538767e7] text-white flex justify-between items-center py-2 px-4">
//         <div></div>

//         <span className="text-lg secondary-font">PlantNest NEPAL</span>

//         <div className="flex space-x-3">
//           <a className="bg-white text-black p-1.5 rounded-full hover:text-blue-400 transition">
//             <Facebook size={18} />
//           </a>
//           <a className="bg-white text-black p-1.5 rounded-full hover:text-pink-500 transition">
//             <Instagram size={18} />
//           </a>
//           <a className="bg-white text-black p-1.5 rounded-full hover:text-red-600 transition">
//             <Youtube size={18} />
//           </a>
//         </div>
//       </div>

//       {/* MAIN NAV */}
//       <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-lg">
//         {/* LOGO */}
//         <div
//           className="flex items-center gap-2 cursor-pointer"
//           onClick={() => navigate("/")}
//         >
//           <img
//             src="/src/assets/images/plantnestlogo.svg"
//             alt="Plant Nest Logo"
//             className="w-18 h-18"
//           />
//         </div>

//         {/* MENU */}
//         <ul className="hidden md:flex gap-12 text-lg font-semibold text-[#274E36]">
//           <NavLink to="/aboutus" className={navItemClass}>
//             About Us
//           </NavLink>

//           <NavLink to="/products" className={navItemClass}>
//             All Products
//           </NavLink>

//           <NavLink to="/wishlist" className={navItemClass}>
//             Wishlist
//           </NavLink>

//           <NavLink to="/blog" className={navItemClass}>
//             Blog
//           </NavLink>
//         </ul>

//         {/* ICONS */}
//         <div className="flex items-center gap-5">
//           <NavLink to="/cart">
//             <ShoppingCart size={18} className="hover:text-green-700" />
//           </NavLink>

//           <NavLink to="/notifications">
//             <Bell size={18} className="hover:text-green-700" />
//           </NavLink>

//           <NavLink to={user ? "/profile" : "/login"}>
//             <User size={18} className="hover:text-green-700" />
//           </NavLink>

//           {/* AUTH BUTTON */}
//           {user ? (
//             <button
//               onClick={handleLogout}
//               className="bg-yellow-400 text-black text-sm px-4 py-1 rounded hover:bg-yellow-500 transition"
//             >
//               Logout
//             </button>x
//           ) : (
//             <button
//               onClick={() => navigate("/login")}
//               className="bg-[#274E36] text-white px-8 py-2 rounded-lg font-semibold hover:-translate-y-1 hover:shadow-lg transition"
//             >
//               Login
//             </button>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;

// import { NavLink, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../auth/authProvider";

// import { useCart } from "../context/CartContext";
// import {
//   Facebook,
//   Instagram,
//   Youtube,
//   ShoppingCart,
//   Bell,
//   User,
// } from "lucide-react";

// const Header = () => {
//   const { user, logout } = useContext(AuthContext);
//   const { cartCount } = useCart();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const navItemClass = ({ isActive }) =>
//     `cursor-pointer transition ${
//       isActive ? "text-green-800 font-bold" : "hover:text-green-700"
//     }`;

//   return (
//     <header>
//       {/* TOP SOCIAL BAR */}
//       <div className="bg-[#538767e7] text-white flex justify-between items-center py-2 px-4">
//         <div></div>

//         <span className="text-lg secondary-font">PlantNest NEPAL</span>

//         <div className="flex space-x-3">
//           <a className="bg-white text-black p-1.5 rounded-full hover:text-blue-400 transition">
//             <Facebook size={18} />
//           </a>
//           <a className="bg-white text-black p-1.5 rounded-full hover:text-pink-500 transition">
//             <Instagram size={18} />
//           </a>
//           <a className="bg-white text-black p-1.5 rounded-full hover:text-red-600 transition">
//             <Youtube size={18} />
//           </a>
//         </div>
//       </div>

//       {/* MAIN NAV */}
//       <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-lg">
//         {/* LOGO */}
//         <div
//           className="flex items-center gap-2 cursor-pointer"
//           onClick={() => navigate("/")}
//         >
//           <img
//             src="/src/assets/images/plantnestlogo.svg"
//             alt="Plant Nest Logo"
//             className="w-18 h-18"
//           />
//         </div>

//         {/* MENU */}
//         <ul className="hidden md:flex gap-12 text-lg font-semibold text-[#274E36]">
//           <NavLink to="/aboutus" className={navItemClass}>
//             About Us
//           </NavLink>

//           <NavLink to="/products" className={navItemClass}>
//             All Products
//           </NavLink>

//           <NavLink to="/wishlist" className={navItemClass}>
//             Wishlist
//           </NavLink>

//           <NavLink to="/blog" className={navItemClass}>
//             Blog
//           </NavLink>
//         </ul>

//         {/* ICONS */}
//         <div className="flex items-center gap-5">
//           {/* Cart with Badge */}
//           <NavLink to="/cart" className="relative">
//             <ShoppingCart size={24} className="hover:text-green-700" />
//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                 {cartCount}
//               </span>
//             )}
//           </NavLink>

//           <NavLink to="/notifications">
//             <Bell size={24} className="hover:text-green-700" />
//           </NavLink>

//           <NavLink to={user ? "/profile" : "/login"}>
//             <User size={24} className="hover:text-green-700" />
//           </NavLink>

//           {/* AUTH BUTTON */}
//           {user ? (
//             <button
//               onClick={handleLogout}
//               className="bg-yellow-400 text-black text-sm px-4 py-1 rounded hover:bg-yellow-500 transition"
//             >
//               Logout
//             </button>
//           ) : (
//             <button
//               onClick={() => navigate("/login")}
//               className="bg-[#274E36] text-white px-8 py-2 rounded-lg font-semibold hover:-translate-y-1 hover:shadow-lg transition"
//             >
//               Login
//             </button>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;

import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/authProvider";
import { useCart } from "../context/cartContext";
import { useSocket } from "../context/socketContext";
import {
  Facebook,
  Instagram,
  Youtube,
  ShoppingCart,
  Bell,
  User,
  X,
  Trash2,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useCart();
  const socketContext = useSocket();
  const navigate = useNavigate();

  // Safe destructuring with defaults
  const {
    notifications = [],
    unreadCount = 0,
    markAsRead = () => {},
    setNotifications = () => {},
    setUnreadCount = () => {},
  } = socketContext || {};

  // Notification dropdown state
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }

      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const API_URL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:5050/api";
      const { data } = await axios.get(`${API_URL}/notifications`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error("Failed to fetch notifications");
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      const API_URL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:5050/api";
      await axios.put(
        `${API_URL}/notifications/${notificationId}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      markAsRead(notificationId);
    } catch (error) {
      console.error("Failed to mark as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    setLoading(true);
    try {
      const API_URL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:5050/api";
      await axios.put(
        `${API_URL}/notifications/mark-all-read`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark all as read");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (notificationId, e) => {
    e.stopPropagation();
    try {
      const API_URL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:5050/api";
      await axios.delete(`${API_URL}/notifications/${notificationId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
    } catch (error) {
      console.error("Failed to delete notification");
    }
  };

  const getNotificationIcon = (type) => {
    const icons = {
      order_placed: "📦",
      order_confirmed: "✅",
      order_shipped: "🚚",
      order_delivered: "🎉",
      order_cancelled: "❌",
      payment_success: "💳",
      payment_failed: "⚠️",
    };
    return icons[type] || "🔔";
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItemClass = ({ isActive }) =>
    `cursor-pointer transition ${
      isActive ? "text-green-800 font-bold" : "hover:text-green-700"
    }`;

  return (
    <header>
      {/* TOP SOCIAL BAR */}
      <div className="bg-[#538767e7] text-white flex justify-between items-center py-2 px-4">
        <div></div>

        <span className="text-lg secondary-font">PlantNest NEPAL</span>

        <div className="flex space-x-3">
          <a className="bg-white text-black p-1.5 rounded-full hover:text-blue-400 transition">
            <Facebook size={18} />
          </a>
          <a className="bg-white text-black p-1.5 rounded-full hover:text-pink-500 transition">
            <Instagram size={18} />
          </a>
          <a className="bg-white text-black p-1.5 rounded-full hover:text-red-600 transition">
            <Youtube size={18} />
          </a>
        </div>
      </div>

      {/* MAIN NAV */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-lg">
        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/src/assets/images/plantnestlogo.svg"
            alt="Plant Nest Logo"
            className="w-18 h-18"
          />
        </div>

        {/* MENU */}
        <ul className="hidden md:flex gap-12 text-lg font-semibold text-[#274E36]">
          <NavLink to="/aboutus" className={navItemClass}>
            About Us
          </NavLink>

          <NavLink to="/products" className={navItemClass}>
            All Products
          </NavLink>

          <NavLink to="/wishlist" className={navItemClass}>
            Wishlist
          </NavLink>

          <NavLink to="/blogs" className={navItemClass}>
            Blog
          </NavLink>
        </ul>

        {/* ICONS */}
        <div className="flex items-center gap-5">
          {/* Cart with Badge */}
          <NavLink to="/cart" className="relative">
            <ShoppingCart size={24} className="hover:text-green-700" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* Notification Bell with Dropdown */}
          {user && socketContext && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 text-[#274E36] hover:text-green-700 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Bell size={24} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-[600px] flex flex-col">
                  {/* Header */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Notifications
                        {unreadCount > 0 && (
                          <span className="ml-2 text-sm text-gray-500">
                            ({unreadCount} new)
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {unreadCount > 0 && (
                          <button
                            onClick={handleMarkAllAsRead}
                            disabled={loading}
                            className="text-sm text-green-600 hover:text-green-700 font-medium disabled:opacity-50"
                          >
                            Mark all read
                          </button>
                        )}
                        <button
                          onClick={() => setIsNotificationOpen(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div className="overflow-y-auto flex-1">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center">
                        <Bell
                          size={48}
                          className="mx-auto text-gray-300 mb-3"
                        />
                        <p className="text-gray-500">No notifications yet</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {notifications.map((notification) => (
                          <div
                            key={notification._id}
                            className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                              !notification.isRead ? "bg-green-50" : ""
                            }`}
                            onClick={() =>
                              !notification.isRead &&
                              handleMarkAsRead(notification._id)
                            }
                          >
                            <div className="flex items-start space-x-3">
                              <span className="text-2xl flex-shrink-0">
                                {getNotificationIcon(notification.type)}
                              </span>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <p className="font-semibold text-gray-900 text-sm">
                                    {notification.title}
                                  </p>
                                  <button
                                    onClick={(e) =>
                                      handleDelete(notification._id, e)
                                    }
                                    className="text-gray-400 hover:text-red-600 transition-colors ml-2"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-400 mt-2">
                                  {formatDistanceToNow(
                                    new Date(notification.createdAt),
                                    { addSuffix: true }
                                  )}
                                </p>
                              </div>

                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0 mt-2" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  {notifications.length > 0 && (
                    <div className="p-3 border-t border-gray-200 bg-gray-50">
                      <button
                        onClick={() => {
                          navigate("/notifications");
                          setIsNotificationOpen(false);
                        }}
                        className="w-full text-sm text-green-600 hover:text-green-700 font-medium"
                      >
                        View all notifications
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* User Icon */}
          {/* User Avatar Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() =>
                user ? setIsProfileOpen(!isProfileOpen) : navigate("/login")
              }
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <User size={24} className="hover:text-green-700" />
            </button>

            {user && isProfileOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-xl border z-50">
                <button
                  onClick={() => {
                    navigate("/orders");
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
                >
                  My Orders
                </button>

                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
                >
                  My Profile
                </button>
              </div>
            )}
          </div>

          {/* AUTH BUTTON */}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-yellow-400 text-black text-sm px-4 py-1 rounded hover:bg-yellow-500 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-[#274E36] text-white px-8 py-2 rounded-lg font-semibold hover:-translate-y-1 hover:shadow-lg transition"
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
