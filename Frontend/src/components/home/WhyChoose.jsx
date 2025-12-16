import { Leaf, Truck, ShieldCheck, Headphones } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChoose() {
  const items = [
    { icon: Leaf, title: "Healthy Plants", desc: "We nurture and handpick plants" },
    { icon: Truck, title: "Fast Delivery", desc: "Carefully packed & delivered" },
    { icon: ShieldCheck, title: "Eco-Friendly", desc: "Sustainable packaging" },
    { icon: Headphones, title: "Care Support", desc: "100% satisfaction guarantee" },
  ];

  return (
    <section className="bg-[#538767e7] bg-opacity-80 dark:bg-[#3f5545] py-20">
      <h2 className="text-center text-3xl font-serif text-white mb-14">
        Why Choose Plant Nest?
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-12 px-6">
        
        {/* LEFT */}
        <div className="space-y-10">
          {items.slice(0, 2).map((item, i) => (
            <Feature key={i} {...item} />
          ))}
        </div>

        {/* CENTER IMAGE */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-full p-10 flex justify-center"
        >
          <img src="src/assets/images/whyypp.png" className="h-64" />
        </motion.div>

        {/* RIGHT */}
        <div className="space-y-10">
          {items.slice(2).map((item, i) => (
            <Feature key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Feature = ({ icon: Icon, title, desc }) => (
  <div className="flex items-start gap-4 text-white">
    <div className="bg-white/20 p-3 rounded-full">
      <Icon />
    </div>
    <div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-white/80">{desc}</p>
    </div>
  </div>
);
