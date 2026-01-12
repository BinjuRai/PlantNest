import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useAuth } from "../../auth/authProvider";
import { toggleWishlist } from "../../services/wishlistService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const FavouriteCard = ({
  plant,
  large,
  isWishlisted,
  onWishlistUpdate,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isInWishlist, setIsInWishlist] = useState(isWishlisted);
  const [isLoading, setIsLoading] = useState(false);

  if (!plant) return null;

  const imageUrl = plant.imagepath
    ? `http://localhost:5050/uploads/${plant.imagepath}`
    : null;

  const handleWishlistClick = async (e) => {
    e.stopPropagation();

    if (!user) {
      toast.error("Please login to add to wishlist");
      navigate("/login");
      return;
    }

    try {
      setIsLoading(true);
      const response = await toggleWishlist(plant._id);

      // Check API response
      const added = response.added ?? true; // fallback to true if missing
      setIsInWishlist(added);

      if (onWishlistUpdate) {
        onWishlistUpdate(plant._id, added);
      }

      toast.success(
        added
          ? `💚 ${plant.name} added to wishlist!`
          : `Removed ${plant.name} from wishlist`
      );
    } catch (err) {
      console.error("Wishlist error:", err);
      toast.error("Failed to update wishlist");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/products/${plant._id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={handleCardClick}
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
        large ? "h-full min-h-[400px]" : "h-64"
      }`}
    >
      {/* Image */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={plant.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center">
          <span className="text-6xl">🌿</span>
        </div>
      )}

      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Product Info - Shows on Hover */}
      <div className="absolute inset-x-0  primary-font bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white primary-font font-bold text-lg mb-1">{plant.name}</h3>
        <p className="text-green-100 primary-font text-sm mb-2">
          {plant.scientificName || plant.plantType}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-white font-bold text-xl">
            Rs. {plant.price}
          </span>
          {plant.stock > 0 ? (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              In Stock
            </span>
          ) : (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Featured Badge */}
      {plant.isFeatured && (
        <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
          ⭐ Featured
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistClick}
        disabled={isLoading}
        className={`absolute top-3 right-3 p-2.5 rounded-full shadow-lg transition-all duration-300 z-10 ${
          isInWishlist
            ? "bg-red-500 hover:bg-red-600"
            : "bg-white/90 hover:bg-white"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <Heart
          size={20}
          className={`transition-all ${
            isInWishlist ? "fill-white text-white" : "text-gray-700"
          }`}
        />
      </button>

      {/* Quick View on Hover (Optional) */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
          className="bg-white text-green-800 px-6 py-2 rounded-full primary-font font-semibold hover:bg-green-100 transition"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};
