

import { Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#538767e7] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-14 text-base secondary-font">

          {/* BRAND */}
          <div className="space-y-4">
            <Link to="/">
              <img
                src="/src/assets/images/whitelogoo.svg"
                alt="Plant Nest Logo"
                className="w-28 cursor-pointer hover:scale-105 transition"
              />
            </Link>

            <p className="text-white/90 leading-relaxed max-w-xs text-lg">
              Bringing nature closer to your home with healthy, hand-picked
              plants grown with love.
            </p>
          </div>

          {/* ACCOUNT */}
          <div>
            <h4 className="font-semibold mb-5 text-xl text-white">My Account</h4>
            <ul className="space-y-3 text-white/90 text-lg">
              <li><Link to="/login" className="hover:text-white">Login</Link></li>
              <li><Link to="/cart" className="hover:text-white">My Cart</Link></li>
              <li><Link to="/wishlist" className="hover:text-white">My Wishlist</Link></li>
              <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link to="/help" className="hover:text-white">Help</Link></li>

            </ul>
          </div>

          {/* PAYMENT */}
          <div>
            <h4 className="font-semibold mb-5 text-xl text-white">Secure Payments</h4>
            <ul className="space-y-3 text-white/90 text-lg">
              <li>Cash on Delivery</li>
              <li>eSewa</li>
              <li>Khalti</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold mb-5 text-xl text-white">
              <Link to="/contact" className="hover:underline">
                Contact Us
              </Link>
            </h4>
            <ul className="space-y-3 text-white/90 text-lg">
              <li>
                📞 <a href="tel:+9779800000000" className="hover:underline">
                  9800000000
                </a>
              </li>
              <li>
                ✉️ <a href="mailto:plantnest@gmail.com" className="hover:underline">
                  plantnest@gmail.com
                </a>
              </li>
              <li>📍 Godawari, Lalitpur, Nepal</li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/30 my-10"></div>

        {/* BOTTOM */}
<div className="flex flex-col items-center justify-center text-center text-white/90 secondary-font">

          <p>© 2025 PlantNest — Lalitpur, Nepal</p>

          {/* SOCIALS */}
          {/* <div className="flex gap-6">
            <a href="#" aria-label="Facebook"><Facebook size={22} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={22} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={22} /></a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
