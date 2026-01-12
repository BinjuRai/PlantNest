// import { Facebook, Instagram, Youtube } from "lucide-react";


// export default function Footer() {
//   return (
//     <footer className="bg-[#538767e7] bg-opacity-80 text-white ">
//       <div className="w-full mx-auto px-12 pt-12 pb-4">

//         {/* TOP GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm secondary-font">

//           {/* BRAND */}
//           <div >
          
//             <img src="/src/assets/images/whitelogoo.svg" alt="Plant Nest Logo" className="w-15 h-15" />
            
            
//           </div>

//           {/* ACCOUNT */}
//           <div>
//             <h4 className="font-semibold mb-4">My Account</h4>
//             <ul className="space-y-2 text-white/80">
//               <li className="hover:text-white cursor-pointer">Login</li>
//               <li className="hover:text-white cursor-pointer">My Cart</li>
//               <li className="hover:text-white cursor-pointer">My Wishlist</li>
//             </ul>
//           </div>

//           {/* PAYMENT */}
//           <div>
//             <h4 className="font-semibold mb-4">Secure Payment Options</h4>
//             <ul className="space-y-2 text-white/80">
//               <li>Cash on Delivery</li>
//               <li>eSewa</li>
//               <li>Khalti</li>
//             </ul>
//           </div>

//           {/* CONTACT */}
//           <div>
//             <h4 className="font-semibold mb-4">Contact Us</h4>
//             <ul className="space-y-2 text-white/80">
//               <li>Phone: 9800000000</li>
//               <li>Email: plantnest@gmail.com</li>
//               <li>Godawari, Lalitpur, NEPAL</li>
//             </ul>
//           </div>
//         </div>

//         {/* DIVIDER */}
//         <div className="border-t border-white/40 mt-16 mb-2"></div>

//         {/* BOTTOM */}
//         <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/80 gap-6 secondary-font">

//           <p>© 2025 PlantNest, Lalitpur NEPAL</p>

//           {/* SOCIALS (SUBTLE) */}
//           <div className="flex gap-5">
//             <a className="hover:text-white transition" href="#">
//               <Facebook size={16} />
//             </a>
//             <a className="hover:text-white transition" href="#">
//               <Instagram size={16} />
//             </a>
//             <a className="hover:text-white transition" href="#">
//               <Youtube size={16} />
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

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
