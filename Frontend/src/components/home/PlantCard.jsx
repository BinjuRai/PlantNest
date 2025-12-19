
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/authProvider";
import toast from "react-hot-toast";

const PlantCard = ({ plant, onAddToCart }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // ✅ Fix: Use correct image URL format
  const imageUrl = plant.imagepath
    ? `http://localhost:5050/uploads/${plant.imagepath}`
    : null;

  const handleAddToCart = () => {
    if (plant.stock === 0) return;

    if (onAddToCart) {
      onAddToCart(plant);
    }

    toast.success(`${plant.name} added to cart 🛒`);
  };

  const handleBuyNow = () => {
    if (plant.stock === 0) return;

    if (!user) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }

    navigate(`/checkout?plantId=${plant._id}`);
  };

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
      
      {/* Image */}
      <div className="h-64 bg-gray-200 dark:bg-gray-700 overflow-hidden relative shadow-red-950">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={plant.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextElementSibling.style.display = "flex";
            }}
          />
        ) : null}
        
        {/* Fallback emoji */}
        <div className={`w-full h-full flex items-center justify-center text-6xl ${imageUrl ? "hidden" : ""}`}>
          🌱
        </div>

        {plant.isFeatured && (
          <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
            ⭐ Featured
          </span>
        )}

        {plant.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 line-clamp-1">
          {plant.name}
        </h3>

        <p className="text-2xl font-bold text-primary mb-3">
          Rs. {plant.price.toFixed(2)}
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={plant.stock === 0}
            className="flex-1 bg-[#274E36] hover:bg-primary-hover text-white py-2 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            🛒 Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            disabled={plant.stock === 0}
            className="flex-1 bg-[#EAB87B] hover:bg-green-700 text-black py-2 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            💳 Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;