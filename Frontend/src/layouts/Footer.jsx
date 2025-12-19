import { Facebook, Instagram, Youtube } from "lucide-react";


export default function Footer() {
  return (
    <footer className="bg-[#538767e7] bg-opacity-80 text-white ">
      <div className="w-full mx-auto px-12 pt-12 pb-4">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm secondary-font">

          {/* BRAND */}
          <div >
          
            <img src="/src/assets/images/whitelogoo.svg" alt="Plant Nest Logo" className="w-15 h-15" />
            
            
          </div>

          {/* ACCOUNT */}
          <div>
            <h4 className="font-semibold mb-4">My Account</h4>
            <ul className="space-y-2 text-white/80">
              <li className="hover:text-white cursor-pointer">Login</li>
              <li className="hover:text-white cursor-pointer">My Cart</li>
              <li className="hover:text-white cursor-pointer">My Wishlist</li>
            </ul>
          </div>

          {/* PAYMENT */}
          <div>
            <h4 className="font-semibold mb-4">Secure Payment Options</h4>
            <ul className="space-y-2 text-white/80">
              <li>Cash on Delivery</li>
              <li>eSewa</li>
              <li>Khalti</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-white/80">
              <li>Phone: 9800000000</li>
              <li>Email: plantnest@gmail.com</li>
              <li>Godawari, Lalitpur, NEPAL</li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/40 mt-16 mb-2"></div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/80 gap-6 secondary-font">

          <p>© 2025 PlantNest, Lalitpur NEPAL</p>

          {/* SOCIALS (SUBTLE) */}
          <div className="flex gap-5">
            <a className="hover:text-white transition" href="#">
              <Facebook size={16} />
            </a>
            <a className="hover:text-white transition" href="#">
              <Instagram size={16} />
            </a>
            <a className="hover:text-white transition" href="#">
              <Youtube size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
