import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { getWishlist, removeFromWishlist } from "../services/wishlistService";
import { useAuth } from "../auth/authProvider";
import { toast } from "react-toastify";

const WishlistPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchWishlist();
  }, [user, navigate]);

  
 
  const fetchWishlist = async () => {
  try {
    setLoading(true);
    const data = await getWishlist();
  
    console.log("Wishlist API:", data); // debug structure
    setWishlist({ products: data.wishlist?.products || data.products || [] });
  } catch (err) {
    console.error("Failed to fetch wishlist:", err);
    toast.error("Failed to load wishlist");
  } finally {
    setLoading(false);
  }
};


  const handleRemove = async (productId, productName) => {
    try {
      await removeFromWishlist(productId);
      toast.success(`Removed ${productName} from wishlist`);
      fetchWishlist(); // Refresh list
    } catch (err) {
      console.error("Remove error:", err);
      toast.error("Failed to remove item");
    }
  };

  const handleAddToCart = (product) => {
    // TODO: Implement add to cart functionality
    toast.success(`${product.name} added to cart! 🛒`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-700"></div>
      </div>
    );
  }

  const products = wishlist?.products || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white secondary-font">
              My Wishlist
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {products.length} {products.length === 1 ? "item" : "items"} saved for later
          </p>
        </div>


        {products.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start adding your favorite plants!
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Browse Products
            </button>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  {product.imagepath ? (
                    <img
                      src={`http://localhost:5050/uploads/${product.imagepath}`}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center">
                      <span className="text-6xl">🌿</span>
                    </div>
                  )}

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(product._id, product.name)}
                    className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition"
                  >
                    <Trash2 size={18} />
                  </button>

                  {/* Stock Badge */}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">
                    {product.name}
                  </h3>

                  {product.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-green-700 dark:text-green-400">
                      Rs. {product.price.toFixed(2)}
                    </span>
                    {product.stock > 0 && (
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {product.stock} in stock
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className="flex-1 bg-green-700 hover:bg-green-800 text-white py-2.5 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => navigate(`/products/${product._id}`)}
                      className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2.5 rounded-lg font-semibold transition"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}


        {products.length > 0 && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                  Total Value
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Combined value of all items
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-green-700 dark:text-green-400">
                  Rs. {products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
                </p>
                <button
                  onClick={() => navigate("/products")}
                  className="text-sm text-green-700 dark:text-green-400 hover:underline mt-1"
                >
                  Continue Shopping →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;