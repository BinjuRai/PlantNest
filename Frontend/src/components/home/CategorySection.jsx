

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import CategoryTabs from "../common/CategoryTabs";
import CategoryCard from "./CategoryCard";

const CategorySection = ({ categories }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");

  if (!categories || categories.length === 0) return null;

  const filteredCategories =
    activeCategory === "all"
      ? categories
      : categories.filter(cat => cat._id === activeCategory);

  return (
    <section className="py-12 px-4 bg-surface-light dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-serif font-semibold text-[#274E36]">
            Shop by Category
          </h2>

          {categories.length > 4 && (
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-3 bg-[#274E36] text-white px-5 py-2 rounded-full hover:bg-green-700 transition"
            >
              View More
              <span className="bg-[#EAB87B] text-black rounded-full px-2 py-1">
                ➜
              </span>
            </button>
          )}
        </div>

        {/* Tabs */}
        {/* <CategoryTabs
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        /> */}

        {/* Cards */}
        <div className="overflow-x-auto flex gap-6 py-8">
          {filteredCategories.map((category) => (
            <div key={category._id} className="flex-shrink-0 w-72">
              <CategoryCard
                category={category}
                onClick={() => navigate(`/products?category=${category._id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
