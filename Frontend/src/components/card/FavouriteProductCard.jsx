// import { motion } from "framer-motion";
// import { WishlistButton } from "../common/WishlistButton";
// import { toggleWishlist } from "../../services/wishlistService";
// import { useAuth } from "../../auth/authProvider";

// export const FavouriteCard = ({ plant, large }) => {
//   const { token } = useAuth();
//   const imageUrl = plant.imagepath 
//     ? `http://localhost:5050${plant.imagepath}` 
//     : null;

//   return (
//     <motion.div
//       whileHover={{ scale: 1.02 }}
//       className={`relative overflow-hidden rounded-2xl ${large ? "h-full" : ""}`}
//     >
//       <img
//         src={imageUrl}
//         className="w-full h-full object-cover"
//       />

//       {/* HOVER BLUR */}
//       <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition flex items-end p-4">
//         <h3 className="text-white font-semibold">{plant.name}</h3>
//       </div>

//       <WishlistButton
//         active={plant.isWishlisted}
//         onClick={() => toggleWishlist(plant._id, token)}
//       />
//     </motion.div>
//   );
// };
import { useAuth } from "../../auth/authProvider";
import { motion } from "framer-motion";
import { WishlistButton } from "../common/WishlistButton";
import { toggleWishlist } from "../../services/wishlistService";
export const FavouriteCard = ({ plant, large }) => {
  const { token } = useAuth();

  if (!plant) return null; // 👈 prevents crash

  const imageUrl = plant.imagepath
    ? `http://localhost:5050${plant.imagepath}`
    : "/placeholder.jpg"; // optional fallback

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden rounded-2xl ${large ? "h-full" : ""}`}
    >
      <img
        src={imageUrl}
        alt={plant.name}
        className="w-full h-full object-cover"
      />

      {/* HOVER BLUR */}
      <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition flex items-end p-4">
        <h3 className="text-white font-semibold">{plant.name}</h3>
      </div>

      <WishlistButton
        active={plant.isWishlisted}
        onClick={() => toggleWishlist(plant._id, token)}
      />
    </motion.div>
  );
};
