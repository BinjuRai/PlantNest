

import { Leaf, Truck, ShieldCheck, Headphones } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChoose() {
  const items = [
    {
      icon: Leaf,
      title: "Smart Plant & Tree Care",
      desc: "We nurture every plant carefully to ensure long-lasting health.",
    },
    {
      icon: Truck,
      title: "Nursery Direct",
      desc: "Plants delivered directly from our nursery to your home.",
    },
    {
      icon: ShieldCheck,
      title: "Plant Sentry",
      desc: "Quality checks and eco-safe handling at every step.",
    },
    {
      icon: Headphones,
      title: "Plant Renovation",
      desc: "Expert guidance and support for your growing journey.",
    },
  ];

  return (
    <section className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* HEADING */}
        <h2 className="text-center text-3xl font-bold font-serif text-[#274E36] mb-16">
          Why Choose <span className="text-[#edab5a]">PlantNest?</span>
        </h2>

        {/* FEATURES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">
          {items.map((item, i) => (
            <Feature key={i} {...item} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Feature = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="text-center flex flex-col items-center"
  >
    {/* ICON */}
    <div className="mb-6 bg-[#eaf4ee] p-6 rounded-full">
      <Icon size={30} className="text-[#538767]" />
    </div>

    {/* TEXT */}
    <h4 className="text-lg font-semibold text-[#274E36] mb-2">
      {title}
    </h4>
    <p className="text-sm text-[#274E36]/70 leading-relaxed max-w-xs">
      {desc}
    </p>
  </motion.div>
);
