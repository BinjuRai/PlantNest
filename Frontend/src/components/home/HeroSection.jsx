const HeroSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background-dark">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4 secondary-font">
          Welcome to PlantNest 🌿
        </h1>
        <p className="text-xl md:text-2xl text-muted-light dark:text-muted-dark mb-8">
          Discover the perfect plants for your home
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-semibold transition">
            Shop Now
          </button>
          <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-semibold transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;