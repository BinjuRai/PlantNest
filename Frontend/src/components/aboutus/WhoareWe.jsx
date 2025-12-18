import { motion } from "framer-motion";

export function WhoWeAre() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-14 items-center">

        <motion.img
          src="src/assets/images/indoorpl.png"
          alt="PlantNest Team"
          className="rounded-3xl shadow-lg"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
        />

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-3xl font-serif text-green-900 dark:text-green-100 mb-6">
            Who We Are
          </h2>
          <p className="text-muted-light dark:text-muted-dark mb-4">
            PlantNest started with a simple idea — make plant care easy and
            accessible for everyone.
          </p>
          <p className="text-muted-light dark:text-muted-dark">
            From our nursery to your home, every plant is nurtured,
            inspected, and delivered with care.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
