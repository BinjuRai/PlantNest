import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
       {/* Footer */}
      <div className="bg-green-700 text-white px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="font-semibold mb-3">PLANT NEST</h3>
            <p>Bringing nature closer to you.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">My Account</h4>
            <p>Login</p>
            <p>My Orders</p>
            <p>My Wishlist</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Payment Options</h4>
            <p>Cash on Delivery</p>
            <p>eSewa</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact Us</h4>
            <p>plantnest@gmail.com</p>
            <p>Kathmandu, Nepal</p>
          </div>
        </div>

       
      
          {/* Social */}
          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <p>&copy; 2025 Plant Nest. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
