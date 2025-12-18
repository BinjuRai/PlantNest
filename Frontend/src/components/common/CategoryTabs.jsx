const categories = [
  { label: "Indoor Plants", value: "indoor" },
  { label: "Outdoor Plants", value: "outdoor" },
  { label: "Hanging Plants", value: "hanging" },
  { label: "Flower Plants", value: "flower" },
];

export default function CategoryTabs({ active, onChange }) {
  return (
    <div className="flex gap-4 justify-center bg-white py-4 shadow-sm">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition
            ${
              active === cat.value
                ? "bg-[#274E36] text-white"
                : "text-[#274E36] hover:bg-[#274E36]/10"
            }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
