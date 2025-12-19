
import { NavLink, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../auth/authProvider";
import {
  Facebook,
  Instagram,
  Youtube,
  ShoppingCart,
  Bell,
  User,
} from "lucide-react";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

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

          <NavLink to="/blog" className={navItemClass}>
            Blog
          </NavLink>
        </ul>

        {/* ICONS */}
        <div className="flex items-center gap-5">
          <NavLink to="/cart">
            <ShoppingCart size={18} className="hover:text-green-700" />
          </NavLink>

          <NavLink to="/notifications">
            <Bell size={18} className="hover:text-green-700" />
          </NavLink>

          <NavLink to={user ? "/profile" : "/login"}>
            <User size={18} className="hover:text-green-700" />
          </NavLink>

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
