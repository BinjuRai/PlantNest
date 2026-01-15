
     

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cartContext";
import { useAuth } from "../../auth/authProvider";
import { toast } from "react-toastify";
import { toggleWishlist, getWishlist } from "../../services/wishlistService";
import { WishlistButton } from "../common/WishlistButton";

const PlantCard = ({ plant }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [inWishlist, setInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Fetch wishlist status (only if logged in)
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) {
        setInWishlist(false);
        return;
      }

      try {
        const response = await getWishlist();
        const wishlistItems = response.data || response;

        if (Array.isArray(wishlistItems)) {
          setInWishlist(
            wishlistItems.some((item) => item._id === plant._id)
          );
        }
      } catch (err) {
        console.error("Failed to fetch wishlist", err);
        setInWishlist(false);
      }
    };

    fetchWishlist();
  }, [plant._id, user]);

  // ❤️ Wishlist toggle
  const handleWishlistClick = async (e) => {
    e.stopPropagation();

    if (!user) {
      toast.info("Please login to add to wishlist");
      navigate("/login");
      return;
    }

    try {
      setIsLoading(true);
      const response = await toggleWishlist(plant._id);

      // backend may or may not return `added`
      const added = response?.added ?? !inWishlist;
      setInWishlist(added);

      toast.success(
        added
          ? `${plant.name} added to wishlist 💚`
          : `${plant.name} removed from wishlist`
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update wishlist");
    } finally {
      setIsLoading(false);
    }
  };

  // 🛒 Add to cart
  const handleAddToCart = async (e) => {
    e.stopPropagation();

    if (!user) {
      toast.info("Please login to add to cart");
      navigate("/login");
      return;
    }

    if (plant.stock === 0) {
      toast.error("Out of stock");
      return;
    }

    try {
      await addToCart(plant._id, 1);
      toast.success(`${plant.name} added to cart 🛒`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  // 💳 Buy now
  const handleBuyNow = async (e) => {
    e.stopPropagation();

    if (!user) {
      toast.info("Please login to continue");
      navigate("/login");
      return;
    }

    if (plant.stock === 0) return;

    await handleAddToCart(e);

    setTimeout(() => {
      navigate(`/checkout?plantId=${plant._id}`);
    }, 500);
  };

  // 🔍 Card click
  const handleCardClick = () => {
    navigate(`/products/${plant._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
    >
      {/* ❤️ Wishlist Heart */}
      <WishlistButton
        active={inWishlist}
        onClick={handleWishlistClick}
        disabled={isLoading}
      />

      {/* Image */}
      <img
        src={
          plant.imagepath
            ? `http://localhost:5050/uploads/${plant.imagepath}`
            : "/default.png"
        }
        alt={plant.name}
        className="w-full h-64 object-cover"
      />

      {/* Details */}
      <div className="p-4">
        <h3 className="font-bold text-lg">{plant.name}</h3>
        <p className="text-green-700 font-bold">
          Rs. {plant.price}
        </p>

        {plant.stock === 0 && (
          <p className="text-red-500 text-sm mt-1">Out of Stock</p>
        )}

        <div className="flex gap-2 mt-3">
          <button
            onClick={handleAddToCart}
            disabled={plant.stock === 0}
            className="flex-1 bg-[#274E36] hover:bg-green-800 text-white py-2 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            🛒 Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            disabled={plant.stock === 0}
            className="flex-1 bg-[#EAB87B] hover:bg-[#d9a768] text-black py-2 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            💳 Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
