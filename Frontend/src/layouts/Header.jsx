
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from '../auth/authProvider';
import { FaRegHeart, FaUserCircle } from "react-icons/fa";
import NotificationBell from '../components/NotificationBell';
import { useWishlist } from '../assets/WishListcontext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { wishlist, isLoading } = useWishlist();  // Use WishlistContext hook here
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(() => navigate("/login"));
  };

  const goToDashboard = () => {
    navigate('normal/dashboard');
  };

  return (
    <header className='bg-[#ffff] py-1'>
      <div className="container">
        <nav className="space-x-4 flex justify-between items-center light">
          <NavLink to="/" className="logoo py-7 light font-extrabold text-3xl tracking-wide">MelodyMe</NavLink>
          
          <div className='flex gap-5'>
            <NavLink to="/" className="light">Categories</NavLink>
            <NavLink to="/" className="light">About us</NavLink>
            <NavLink to="/" className="light">Blog</NavLink>
            <NavLink to="/contact" className="light">Contact us</NavLink>
          </div>

          <div className='flex gap-5 flex-row justify-center items-center'>
            <NavLink to="/normal/wishlist" className="relative text-[#fff] hover:text-red-600 transition-colors duration-300 text-2xl">
              <FaRegHeart />
              {!isLoading && wishlist?.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-[#dfd5d5dd] text-red-500 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )}
            </NavLink>

            <NavLink>
              <NotificationBell />
            </NavLink>

            {!user ? (
              <>
          
                <NavLink to="/login" className='px-5 py-2 bg-green-930 rounded-[18px] text-[#fff] hover:bg-gray-300'>
                  Login
                </NavLink>
              </>
            ) : (
              <>
                <button
                  onClick={goToDashboard}
                  title="Go to Dashboard"
                  className="text-white text-3xl hover:text-[#ded5a2fc] transition-colors"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <FaUserCircle />
                </button>
                <span className="ml-2 text-white">Welcome, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="px-5 py-1 border border-[#0a1229] text-[#0a1229] bg-white rounded-[22px] font-medium hover:bg-[#0a1229] hover:text-white transition-colors duration-200 ml-4"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;