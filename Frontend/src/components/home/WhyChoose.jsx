
import { Leaf, Truck, ShieldCheck, Headphones } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChoose() {
  const items = [
    { icon: Leaf, title: "Healthy Plants", desc: "We nurture and handpick every plant with care" },
    { icon: Truck, title: "Fast Delivery", desc: "Carefully packed & delivered fresh to you" },
    { icon: ShieldCheck, title: "Eco-Friendly", desc: "100% sustainable & recyclable packaging" },
    { icon: Headphones, title: "Care Support", desc: "Expert help & satisfaction guarantee" },
  ];

  return (
    <section className="relative py-12 bg-[#538767e8] overflow-hidden">
      
      {/* Decorative blur */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <h2 className="text-center text-4xl font-serif text-white mb-16">
        Why Choose <span className="text-[#edab5a]">PlantNest?</span>
      </h2>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-16 px-6">
        
        {/* LEFT */}
        <div className="space-y-12">
          {items.slice(0, 2).map((item, i) => (
            <Feature key={i} {...item} />
          ))}
        </div>

        {/* CENTER IMAGE */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-lg rounded-full p-12 shadow-2xl flex justify-center"
        >
          <img
            src="src/assets/images/whyypp.png"
            className="h-64 drop-shadow-xl"
            alt="Plant"
          />
        </motion.div>

        {/* RIGHT */}
        <div className="space-y-12">
          {items.slice(2).map((item, i) => (
            <Feature key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Feature = ({ icon: Icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -6 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="flex items-start gap-5 text-white group"
  >
    <div className="bg-white/20 p-4 rounded-full group-hover:bg-[#c8f3d2] group-hover:text-[#2f4f3c] transition-all duration-300 shadow-lg">
      <Icon size={26} />
    </div>
    <div>
      <h4 className="text-lg font-semibold tracking-wide">{title}</h4>
      <p className="text-sm text-white/80 leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);
