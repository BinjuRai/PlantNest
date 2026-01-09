

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../../context/cartContext";
// import { toast } from "react-toastify";
// import { getWishlist, toggleWishlist } from "../../services/wishlistService";

// const PlantCard = ({ plant }) => {
//   const navigate = useNavigate();
//   const { addToCart } = useCart();

//   const imageUrl = plant.imagepath
//     ? `http://localhost:5050/uploads/${plant.imagepath}`
//     : null;

//   const [inWishlist, setInWishlist] = useState(false);

//   // Load wishlist status
//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         const wishlist = await getWishlist();
//         const exists = wishlist.some((item) => item._id === plant._id);
//         setInWishlist(exists);
//       } catch (err) {
//         console.error("Failed to fetch wishlist", err);
//       }
//     };
//     fetchWishlist();
//   }, [plant._id]);

//   const handleAddToCart = async (e) => {
//     e.stopPropagation(); // Prevent navigation

//     if (plant.stock === 0) {
//       toast.error("Product is out of stock");
//       return;
//     }

//     try {
//       await addToCart(plant._id, 1);
//       toast.success(`${plant.name} added to cart 🛒`);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to add to cart");
//     }
//   };

//   const handleBuyNow = (e) => {
//     e.stopPropagation(); // Prevent navigation

//     if (plant.stock === 0) return;

//     handleAddToCart(e);
//     setTimeout(() => {
//       navigate(`/checkout?plantId=${plant._id}`);
//     }, 500);
//   };

//   const handleToggleWishlist = async (e) => {
//     e.stopPropagation(); // Prevent navigation
//     try {
//       await toggleWishlist(plant._id);
//       setInWishlist((prev) => !prev);
//       toast.success(
//         inWishlist
//           ? `${plant.name} removed from wishlist 💔`
//           : `${plant.name} added to wishlist ❤️`
//       );
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to update wishlist");
//     }
//   };

//   const handleCardClick = () => {
//     navigate(`/products/${plant._id}`);
//   };

//   return (
//     <div
//       onClick={handleCardClick}
//       className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer relative"
//     >
//       {/* Image */}
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

//         {/* Wishlist Button */}
//         {/* <button
//           onClick={handleToggleWishlist}
//           className="absolute top-2 left-2 text-2xl p-1 rounded-full bg-white/80 hover:bg-red-200 transition"
//         >
//           {inWishlist ? "❤️" : "🤍"}
//         </button> */}
//         <button
//           onClick={handleToggleWishlist}
//           className={`absolute top-2 left-2 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 shadow hover:bg-red-100 transition`}
//         >
//           <span className="text-xl">{inWishlist ? "❤️" : "🤍"}</span>
//         </button>

//         {plant.isFeatured && (
//           <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
//             ⭐ Featured
//           </span>
//         )}

//         {plant.stock === 0 && (
//           <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//             <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
//               Out of Stock
//             </span>
//           </div>
//         )}
//       </div>

//       {/* Details */}
//       <div className="p-4">
//         <h3 className="font-bold text-lg mb-1 line-clamp-1">{plant.name}</h3>

//         <p className="text-2xl font-bold text-primary mb-3">
//           Rs. {plant.price.toFixed(2)}
//         </p>

//         <div className="flex gap-2">
//           <button
//             onClick={handleAddToCart}
//             disabled={plant.stock === 0}
//             className="flex-1 bg-[#274E36] hover:bg-primary-hover text-white py-2 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition"
//           >
//             🛒 Add to Cart
//           </button>

//           <button
//             onClick={handleBuyNow}
//             disabled={plant.stock === 0}
//             className="flex-1 bg-[#EAB87B] hover:bg-green-700 text-black py-2 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition"
//           >
//             💳 Buy Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlantCard;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../../context/cartContext";
// import { toast } from "react-toastify";
// import { toggleWishlist, getWishlist } from "../../services/wishlistService";

// const PlantCard = ({ plant }) => {
//   const navigate = useNavigate();
//   const { addToCart } = useCart();
//   const [inWishlist, setInWishlist] = useState(false);

//   // ✅ Fetch wishlist status
//   const fetchWishlist = async () => {
//     try {
//       const response = await getWishlist();
//       // Assuming response is { data: [...] }
//       const wishlistItems = response.data || response; // adjust depending on your API
//       setInWishlist(wishlistItems.some((item) => item._id === plant._id));
//     } catch (err) {
//       console.error("Failed to fetch wishlist", err);
//     }
//   };

//   useEffect(() => {
//     fetchWishlist();
//   }, [plant]);

//   const handleToggleWishlist = async (e) => {
//     e.stopPropagation();
//     try {
//       await toggleWishlist(plant._id);
//       setInWishlist((prev) => !prev);
//       toast.success(
//         !inWishlist
//           ? `${plant.name} added to wishlist 💚`
//           : `${plant.name} removed from wishlist`
//       );
//     } catch (err) {
//       toast.error("Failed to update wishlist");
//     }
//   };

//   const handleAddToCart = async (e) => {
//     e.stopPropagation();
//     try {
//       await addToCart(plant._id, 1);
//       toast.success(`${plant.name} added to cart 🛒`);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
//       {/* Heart */}
//       <button
//         onClick={handleToggleWishlist}
//         className="absolute top-2 left-2 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 shadow hover:bg-red-100 transition"
//       >
//         <span className="text-xl">{inWishlist ? "❤️" : "🤍"}</span>
//       </button>

//       {/* Image */}
//       <img
//         src={
//           plant.imagepath
//             ? `http://localhost:5050/uploads/${plant.imagepath}`
//             : "/default.png"
//         }
//         alt={plant.name}
//         className="w-full h-64 object-cover"
//       />

//       {/* Details */}
//       <div className="p-4">
//         <h3 className="font-bold text-lg">{plant.name}</h3>
//         <p className="text-green-700 font-bold">Rs. {plant.price}</p>

//         <button
//           onClick={handleAddToCart}
//           className="mt-2 w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg font-semibold transition"
//         >
//           🛒 Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PlantCard;



// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../../context/cartContext";
// import { useAuth } from "../../auth/authProvider";
// import { toast } from "react-toastify";
// import { toggleWishlist, getWishlist } from "../../services/wishlistService";

// const PlantCard = ({ plant }) => {
//   const navigate = useNavigate();
//   const { addToCart } = useCart();
//   const { user } = useAuth();
//   const [inWishlist, setInWishlist] = useState(false);

//   // ✅ Fetch wishlist status ONLY if user is logged in
//   const fetchWishlist = async () => {
//     if (!user) {
//       setInWishlist(false);
//       return;
//     }

//     try {
//       const response = await getWishlist();
//       const wishlistItems = response.data || response;
      
//       if (Array.isArray(wishlistItems)) {
//         setInWishlist(wishlistItems.some((item) => item._id === plant._id));
//       } else {
//         setInWishlist(false);
//       }
//     } catch (err) {
//       console.error("Failed to fetch wishlist", err);
//       setInWishlist(false);
//     }
//   };

//   useEffect(() => {
//     fetchWishlist();
//   }, [plant, user]);

//   const handleToggleWishlist = async (e) => {
//     e.stopPropagation();
    
//     if (!user) {
//       toast.info("Please login to add to wishlist");
//       navigate("/login");
//       return;
//     }

//     try {
//       await toggleWishlist(plant._id);
//       setInWishlist((prev) => !prev);
//       toast.success(
//         !inWishlist
//           ? `${plant.name} added to wishlist 💚`
//           : `${plant.name} removed from wishlist`
//       );
//     } catch (err) {
//       toast.error("Failed to update wishlist");
//     }
//   };

//   const handleAddToCart = async (e) => {
//     e.stopPropagation();
    
//     if (!user) {
//       toast.info("Please login to add to cart");
//       navigate("/login");
//       return;
//     }

//     try {
//       await addToCart(plant._id, 1);
//       toast.success(`${plant.name} added to cart 🛒`);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to add to cart");
//     }
//   };

//   // ✅ Buy Now handler
//   const handleBuyNow = async (e) => {
//     e.stopPropagation();

//     if (plant.stock === 0) return;

//     if (!user) {
//       toast.info("Please login to continue");
//       navigate("/login");
//       return;
//     }

//     // Add to cart first
//     await handleAddToCart(e);
    
//     // Navigate to checkout after a short delay
//     setTimeout(() => {
//       navigate(`/checkout?plantId=${plant._id}`);
//     }, 500);
//   };

//   return (
//     <div className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
//       {/* Heart */}
//       <button
//         onClick={handleToggleWishlist}
//         className="absolute top-2 left-2 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 shadow hover:bg-red-100 transition"
//       >
//         <span className="text-xl">{inWishlist ? "❤️" : "🤍"}</span>
//       </button>

//       {/* Image */}
//       <img
//         src={
//           plant.imagepath
//             ? `http://localhost:5050/uploads/${plant.imagepath}`
//             : "/default.png"
//         }
//         alt={plant.name}
//         className="w-full h-64 object-cover"
//       />

//       {/* Details */}
//       <div className="p-4">
//         <h3 className="font-bold text-lg">{plant.name}</h3>
//         <p className="text-green-700 font-bold">Rs. {plant.price}</p>

//         {/* Stock Status */}
//         {plant.stock === 0 && (
//           <p className="text-red-500 text-sm mt-1">Out of Stock</p>
//         )}

//         {/* Button Group */}
//         <div className="flex gap-2 mt-3">
//           <button
//             onClick={handleAddToCart}
//             disabled={plant.stock === 0}
//             className="flex-1 bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition"
//           >
//             🛒 Add to Cart
//           </button>

//           <button
//             onClick={handleBuyNow}
//             disabled={plant.stock === 0}
//             className="flex-1 bg-[#EAB87B] hover:bg-[#d9a768] text-black py-2 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition"
//           >
//             💳 Buy Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlantCard;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cartContext";
import { useAuth } from "../../auth/authProvider";
import { toast } from "react-toastify";
import { toggleWishlist, getWishlist } from "../../services/wishlistService";

const PlantCard = ({ plant }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [inWishlist, setInWishlist] = useState(false);

  // ✅ Fetch wishlist status ONLY if user is logged in
  const fetchWishlist = async () => {
    if (!user) {
      setInWishlist(false);
      return;
    }

    try {
      const response = await getWishlist();
      const wishlistItems = response.data || response;
      
      if (Array.isArray(wishlistItems)) {
        setInWishlist(wishlistItems.some((item) => item._id === plant._id));
      } else {
        setInWishlist(false);
      }
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
      setInWishlist(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [plant, user]);

  const handleToggleWishlist = async (e) => {
    e.stopPropagation();
    
    if (!user) {
      toast.info("Please login to add to wishlist");
      navigate("/login");
      return;
    }

    try {
      await toggleWishlist(plant._id);
      setInWishlist((prev) => !prev);
      toast.success(
        !inWishlist
          ? `${plant.name} added to wishlist 💚`
          : `${plant.name} removed from wishlist`
      );
    } catch (err) {
      toast.error("Failed to update wishlist");
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    
    if (!user) {
      toast.info("Please login to add to cart");
      navigate("/login");
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

  // ✅ Buy Now handler
  const handleBuyNow = async (e) => {
    e.stopPropagation();

    if (plant.stock === 0) return;

    if (!user) {
      toast.info("Please login to continue");
      navigate("/login");
      return;
    }

    // Add to cart first
    await handleAddToCart(e);
    
    // Navigate to checkout after a short delay
    setTimeout(() => {
      navigate(`/checkout?plantId=${plant._id}`);
    }, 500);
  };

  // ✅ Navigate to product details when card is clicked
  const handleCardClick = () => {
    navigate(`/products/${plant._id}`);
  };

  return (
    <div 
      onClick={handleCardClick} // ✅ Added onClick to navigate to details
      className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
    >
      {/* Heart */}
      <button
        onClick={handleToggleWishlist}
        className="absolute top-2 left-2 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 shadow hover:bg-red-100 transition z-10"
      >
        <span className="text-xl">{inWishlist ? "❤️" : "🤍"}</span>
      </button>

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
        <p className="text-green-700 font-bold">Rs. {plant.price}</p>

        {/* Stock Status */}
        {plant.stock === 0 && (
          <p className="text-red-500 text-sm mt-1">Out of Stock</p>
        )}

        {/* Button Group */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleAddToCart}
            disabled={plant.stock === 0}
            className="flex-1 bg-[#274E36] hover:bg-green-800 text-white py-2 rounded-lg border-1 border-[#d9a768] font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            🛒 Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            disabled={plant.stock === 0}
            className="flex-1 bg-[#EAB87B] hover:bg-[#d9a768] text-black py-2 rounded-lg border-1 border-[#274E36] font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            💳 Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
     