

// // export default CategoryCard;
// const CategoryCard = ({ category, onClick }) => {
//   const imageUrl = category.imagepath
//     ? `http://localhost:5050/uploads/${category.imagepath}`
//     : null;

//   return (
//     <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group">
//       {/* IMAGE */}
//       {imageUrl ? (
//         <div
//           className="w-full h-48 rounded-xl overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700 cursor-pointer"
//           onClick={() => onClick && onClick(category)}
//         >
//           <img
//             src={imageUrl}
//             alt={category.name}
//             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//             onError={(e) => {
//               e.target.style.display = "none";
//               e.target.nextElementSibling.style.display = "flex";
//             }}
//           />
//           <div className="w-full h-full hidden items-center justify-center text-6xl">
//             🌿
//           </div>
//         </div>
//       ) : (
//         <div className="w-full h-48 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-6xl">
//           🌿
//         </div>
//       )}

//       {/* NAME */}
//       <h3 className="font-semibold secondary-font text-center text-xl text-[#274E36] dark:text-text-dark group-hover:text-green-700 transition">
//         {category.name}
//       </h3>

//       {/* DESCRIPTION */}
//       {category.description && (
//         <p className="text-sm text-center text-muted-light dark:text-muted-dark mt-2 line-clamp-2">
//           {category.description}
//         </p>
//       )}
//     </div>
//   );
// };

// export default CategoryCard;

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
