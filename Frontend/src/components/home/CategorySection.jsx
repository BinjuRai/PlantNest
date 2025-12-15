import CategoryCard from "./CategoryCard";

const CategorySection = ({ categories }) => {
  // Safety check - don't render if no categories
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return null;
  }

  return (
    <section className="py-12 px-4 bg-surface-light dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-text-light dark:text-text-dark">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;