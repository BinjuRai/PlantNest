
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from '../auth/authProvider';
import {
  Facebook,
  Instagram,
  Youtube,
  ShoppingCart,
  Bell,
  User
} from "lucide-react";
// import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";


const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
  logout();
  navigate("/login");
};


  const goToDashboard = () => {
    navigate('normal/dashboard');
  };

  return (
    <header className=''> 
    
    <div className="bg-[#538767e7] bg-opacity-80 text-white flex justify-between items-center py-2 px-4">
      {/* Empty div for left spacing if needed */}
      <div></div>

      {/* Center text */}
      <span className="font-regular text-lg secondary-font">PlantNest NEPAL</span>

      {/* Social icons */}
      <div className="flex space-x-3">
        <a
          href="#"
          className="bg-white text-black p-1.5 rounded-full hover:text-green-400 transition"
        >
          <Facebook className="w-5 h-5" />
        </a>
        <a
          href="#"
          className="bg-white text-black p-1.5 rounded-full hover:text-pink-500 transition"
        >
          <Instagram className="w-5 h-5" />
        </a>
        <a
          href="#"
          className="bg-white text-black p-1.5 rounded-full hover:text-red-600 transition"
        >
          <Youtube className="w-5 h-5" />
        </a>
      </div>
    </div>
     

      <div >
        {/* Top Bar */}
      {/* <div className="bg-green-700 text-white text-sm py-2 flex justify-center">
        <span className="font-semibold">PlantNest NEPAL</span>
      </div> */}
    

      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-lg">
        <div className="flex items-center gap-2">
          <img src="/src/assets/images/plantnestlogo.svg" alt="Plant Nest Logo" className="w-15 h-15 " />
        </div>

        <ul className="hidden md:flex gap-12 text-sxl font-semibold text-[#274E36]">
          <li className="cursor-pointer">About us</li>
          <li className="cursor-pointer">Categories</li>
          <li className="cursor-pointer">Wishlist</li>
           <li className="cursor-pointer">Blog</li>
        </ul>

        <div className="flex items-center gap-4">
      
          <ShoppingCart size={18}  />
          
          <Bell size={18}  />
     
          <User size={18}  />
       
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
      className= "bg-[#274E36] text-white px-10 py-2 rounded-lg font-semibold transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:shadow-md focus:outline-none focus:ring-2 focus:ring-[#274E36]/50"
    >
      Login
    </button>
  )}
 
  
</div>
      </nav>

      </div>
    </header>
  );
};

export default Header;