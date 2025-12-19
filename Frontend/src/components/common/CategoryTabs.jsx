

// import { useEffect, useState } from "react";
// import { getAllCategoriesApi } from "../../services/categoryService";


export default function CategoryTabs({ categories, active, onChange }) {
  return (
    <div className="flex gap-6 justify-center bg-white py-4 shadow-sm overflow-x-auto">
      {/* All */}
      <button
        onClick={() => onChange("all")}
        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition
          ${
            active === "all"
              ? "bg-[#274E36] text-white"
              : "text-[#274E36] hover:bg-[#274E36]/10"
          }`}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => onChange(cat._id)}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition
            ${
              active === cat._id
                ? "bg-[#274E36] text-white"
                : "text-[#274E36] hover:bg-[#274E36]/10"
            }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
