
const CategoryCard = ({ category }) => {
 
  const imageUrl = category.imagepath
    ? `http://localhost:5050/uploads/${category.imagepath}`
    : null;

  return (
    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
      {imageUrl ? (
        <div className="w-full h-32 rounded-lg overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700">
          <img
            src={imageUrl}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              // Fallback if image fails to load
              e.target.style.display = "none";
              e.target.nextElementSibling.style.display = "flex";
            }}
          />
          <div className="w-full h-full hidden items-center justify-center text-5xl">
            🌿
          </div>
        </div>
      ) : (
        <div className="w-full h-32 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-5xl">
          🌿
        </div>
      )}
      
      <h3 className="font-semibold secondary-font text-center text-lg text-[#274E36] dark:text-text-dark group-hover:text-primary transition">
        {category.name}
      </h3>
      
      {category.description && (
        <p className="text-sm text-center text-muted-light dark:text-muted-dark mt-2 line-clamp-2">
          {category.description}
        </p>
      )}
    </div>
  );
};

export default CategoryCard;