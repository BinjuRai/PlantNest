

const CategoryCard = ({ category, onClick }) => {
  const imageUrl = category.imagepath
    ? `http://localhost:5050/uploads/${category.imagepath}`
    : null;

  return (
    <div
      onClick={onClick}
      className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl 
      hover:shadow-2xl transition-all duration-300 cursor-pointer group"
    >
      {/* IMAGE */}
      <div className="w-full h-48 rounded-xl overflow-hidden mb-4 bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            🌿
          </div>
        )}
      </div>

      {/* NAME */}
      <h3 className="font-semibold secondary-font text-center text-xl text-[#274E36] group-hover:text-green-700">
        {category.name}
      </h3>

      {/* DESCRIPTION */}
      {category.description && (
        <p className="text-sm text-center text-muted-light mt-2 line-clamp-2">
          {category.description}
        </p>
      )}
    </div>
  );
};

export default CategoryCard;
