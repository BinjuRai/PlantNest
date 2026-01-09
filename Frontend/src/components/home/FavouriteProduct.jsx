
import { useState, useEffect } from "react";
import { FavouriteCard } from "../card/FavouriteProductCard.jsx";
import { getWishlist } from "../../services/wishlistService";
import { useAuth } from "../../auth/authProvider";
import { useNavigate } from "react-router-dom";

export default function FavouriteProducts({ plants }) {
  
  const { user } = useAuth();
   const navigate = useNavigate(); 
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const data = await getWishlist();
      const ids = data.wishlist?.products?.map(p => p._id) || [];
      setWishlistIds(ids);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  };

  const handleWishlistUpdate = (productId, added) => {
    if (added) {
      setWishlistIds([...wishlistIds, productId]);
    } else {
      setWishlistIds(wishlistIds.filter(id => id !== productId));
    }
  };

  // Filter featured products or use first 5
  const displayPlants = plants?.filter(p => p.isFeatured).slice(0, 5) || plants?.slice(0, 5) || [];

  if (!displayPlants.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-serif font-semibold text-[#274E36] dark:text-green-100">
          Our Favourite Products
        </h2>
        
        {/* <button className="inline-flex shadow-lg items-center gap-3 bg-[#274E36] text-white px-5 py-2 rounded-full hover:bg-green-700 transition">
          View More
          <span className="bg-[#EAB87B] text-black secondary-font font-light rounded-full px-2 py-1 flex items-center justify-center">
            ➜
          </span>
        </button> */}
         <button 
            onClick={() => navigate("/wishlist")}
            className="inline-flex shadow-lg items-center gap-3 bg-[#274E36] text-white px-5 py-2 rounded-full hover:bg-green-700 transition"
          >
            View More
            <span className="bg-[#EAB87B] text-black secondary-font font-light rounded-full px-2 py-1 flex items-center justify-center">
              ➜
            </span>
          </button>
      </div>

      <div className="bg-[#cdddcf] dark:bg-[#3b4f44] rounded-3xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {/* Large featured card */}
          <div className="col-span-2 row-span-2">
            <FavouriteCard 
              plant={displayPlants[0]} 
              large 
              isWishlisted={wishlistIds.includes(displayPlants[0]?._id)}
              onWishlistUpdate={handleWishlistUpdate}
            />
          </div>
          
          {/* Smaller cards */}
          {displayPlants.slice(1, 5).map((plant) => (
            <FavouriteCard 
              key={plant._id} 
              plant={plant} 
              isWishlisted={wishlistIds.includes(plant._id)}
              onWishlistUpdate={handleWishlistUpdate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}