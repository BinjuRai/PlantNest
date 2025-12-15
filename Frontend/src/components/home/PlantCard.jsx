// const PlantCard = ({ plant, onAddToCart, onBuyNow }) => {
//   const imageUrl = plant.imagepath 
//     ? `http://localhost:5050${plant.imagepath}` 
//     : null;

//   const handleAddToCart = () => {
//     if (onAddToCart && plant.stock > 0) {
//       onAddToCart(plant);
//     }
//   };

//   const handleBuyNow = () => {
//     if (onBuyNow && plant.stock > 0) {
//       onBuyNow(plant);
//     }
//   };

//   return (
//     <div className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
//       {/* Plant Image */}
//       <div className="h-64 bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
//         {imageUrl ? (
//           <img
//             src={imageUrl}
//             alt={plant.name}
//             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center text-6xl">
//             🌱
//           </div>
//         )}
        
//         {/* Featured Badge */}
//         {plant.isFeatured && (
//           <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
//             ⭐ Featured
//           </span>
//         )}

//         {/* Out of Stock Overlay */}
//         {plant.stock === 0 && (
//           <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//             <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
//               Out of Stock
//             </span>
//           </div>
//         )}
//       </div>

//       {/* Plant Details */}
//       <div className="p-4">
//         <h3 className="font-bold text-lg mb-1 text-text-light dark:text-text-dark line-clamp-1">
//           {plant.name}
//         </h3>
        
//         {plant.scientificName && (
//           <p className="text-sm italic text-muted-light dark:text-muted-dark mb-2 line-clamp-1">
//             {plant.scientificName}
//           </p>
//         )}

//         {plant.plantType && (
//           <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded mb-2 capitalize">
//             {plant.plantType}
//           </span>
//         )}

//         <p className="text-2xl font-bold text-primary mb-3">
//           ${plant.price.toFixed(2)}
//         </p>

//         {plant.description && (
//           <p className="text-sm text-muted-light dark:text-muted-dark mb-3 line-clamp-2">
//             {plant.description}
//           </p>
//         )}

//         <div className="flex items-center justify-between mb-3">
//           <span className={`text-sm font-semibold ${
//             plant.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
//           }`}>
//             {plant.stock > 0 ? `${plant.stock} in stock` : 'Out of stock'}
//           </span>
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-2">
//           <button
//             onClick={handleAddToCart}
//             disabled={plant.stock === 0}
//             className="flex-1 bg-primary hover:bg-primary-hover text-white py-2 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
//           >
//             {plant.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
//           </button>

//           <button
//             onClick={handleBuyNow}
//             disabled={plant.stock === 0}
//             className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
//           >
//             {plant.stock > 0 ? '💳 Buy Now' : 'Out of Stock'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlantCard;



import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/authProvider";

const PlantCard = ({ plant }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const imageUrl = plant.imagepath 
    ? `http://localhost:5050${plant.imagepath}` 
    : null;

  const handleAddToCart = () => {
    if (plant.stock === 0) return;
    console.log("Add to cart:", plant);
  };

  const handleBuyNow = () => {
    if (plant.stock === 0) return;

    // Redirect to checkout
    navigate(`/checkout?plantId=${plant._id}`);
  };

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
      
      {/* Plant Image */}
      <div className="h-64 bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={plant.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            🌱
          </div>
        )}

        {/* Featured Badge */}
        {plant.isFeatured && (
          <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
            ⭐ Featured
          </span>
        )}

        {/* Out of Stock Overlay */}
        {plant.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Plant Details */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 text-text-light dark:text-text-dark line-clamp-1">
          {plant.name}
        </h3>

        {plant.scientificName && (
          <p className="text-sm italic text-muted-light dark:text-muted-dark mb-2 line-clamp-1">
            {plant.scientificName}
          </p>
        )}

        {plant.plantType && (
          <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded mb-2 capitalize">
            {plant.plantType}
          </span>
        )}

        <p className="text-2xl font-bold text-primary mb-3">
          ${plant.price.toFixed(2)}
        </p>

        {plant.description && (
          <p className="text-sm text-muted-light dark:text-muted-dark mb-3 line-clamp-2">
            {plant.description}
          </p>
        )}

        <div className="flex items-center justify-between mb-3">
          <span className={`text-sm font-semibold ${
            plant.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {plant.stock > 0 ? `${plant.stock} in stock` : 'Out of stock'}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={plant.stock === 0}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {plant.stock > 0 ? '🛒 Cart' : 'Out of Stock'}
          </button>

          <button
            onClick={handleBuyNow}
            disabled={plant.stock === 0}
            className="flex-1 bg-primary hover:bg-primary-hover text-white py-2 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {plant.stock > 0 ? '💳 Buy Now' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
