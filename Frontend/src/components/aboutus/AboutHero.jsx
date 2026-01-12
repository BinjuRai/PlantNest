import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative bg-[#88A18B] dark:bg-[#3f5545] py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto text-center px-6 text-white"
      >
        <h1 className="text-5xl secondary-font mb-6">About PlantNest</h1>
        <p className="text-lg text-white/90 max-w-2xl mx-auto">
          We bring nature closer to your home by delivering healthy,
          hand-picked plants with care and love.
        </p>
      </motion.div>
    </section>
  );
}
