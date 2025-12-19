
import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";

const CategorySection = ({ categories }) => {
  // Safety check - don't render if no categories
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return null;
  }

  return (
    <section className="py-12 px-4 bg-surface-light dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-text-light dark:text-text-dark">
            Shop by Category
          </h2>
          {categories.length > 4 && (
            <Link
              to="/categories"
              className="text-green-700 dark:text-green-400 font-semibold hover:underline"
            >
              View All →
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.slice(0, 8).map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;