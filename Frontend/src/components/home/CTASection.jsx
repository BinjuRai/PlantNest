import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export default function CTASection() {
   const navigate = useNavigate(); 
  return (

<section
  className="relative py-24 bg-cover bg-center"
  style={{ backgroundImage: "url(src/assets/images/bgcta.png)" }}
>
  {/* Optional full-section overlay */}
  <div className="absolute inset-0 bg-green-900/30"></div>

  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="relative max-w-2xl mx-auto px-6"
  >
    {/* OPACITY / BACKGROUND WRAPPER */}
    <div className="bg-black/40 rounded-xl p-8 text-center text-white">
      <h2 className="text-3xl font-serif mb-4">
        Start Your Plant Journey Today.
      </h2>
      <p className="text-white/80 mb-6">
        Join thousands of happy plant parents and transform your space.
      </p>

      <button onClick={() => navigate("/products")}
       className="inline-flex shadow-lg items-center gap-3 bg-[#274E36] text-white px-7 py-2 rounded-full hover:bg-green-700 transition">
        Browse Collection
        <span className="bg-[#EAB87B] text-black secondary-font font-light rounded-full px-3 py-1.5 flex items-center justify-center">
          ➜
        </span>
      </button>
    </div>
  </motion.div>
</section>
  );
    
}
