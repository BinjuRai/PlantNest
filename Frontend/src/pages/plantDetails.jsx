import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlantByIdApi } from "../services/plantService";
import { addReviewApi, getReviewsApi } from "../services/reviewService"; // ✅ ADD THIS IMPORT
import { useCart } from "../context/cartContext";
import { useAuth } from "../auth/authProvider";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { toggleWishlist, getWishlist } from "../services/wishlistService";
import { WishlistButton } from "../components/common/WishlistButton";
import PlantSection from "../components/home/PlantSection";
import CTASection from "../components/home/CTASection";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("info");
  const [inWishlist, setInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchWishlistStatus = async () => {
      if (!user || !product) {
        setInWishlist(false);
        return;
      }

      try {
        const response = await getWishlist();
        const wishlistItems = response.data || response;

        if (Array.isArray(wishlistItems)) {
          setInWishlist(wishlistItems.some((item) => item._id === product._id));
        }
      } catch (err) {
        console.error("Wishlist fetch failed", err);
      }
    };

    fetchWishlistStatus();
  }, [user, product]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!product) return;
      try {
        const response = await getReviewsApi(product._id);
        setReviews(response.data);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    };
    fetchReviews();
  }, [product]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getPlantByIdApi(id);
      setProduct(data);
    } catch (err) {
      console.error("Failed to fetch product:", err);
      toast.error("Product not found");
      navigate("/products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add to cart");
      navigate("/login");
      return;
    }
    try {
      await addToCart(product._id, quantity);
    } catch (err) {
      console.error(err);
    }
  };

  const handleWishlistClick = async (e) => {
    e.stopPropagation();

    if (!user) {
      toast.info("Please login to add to wishlist");
      navigate("/login");
      return;
    }

    try {
      setIsLoading(true);
      const response = await toggleWishlist(product._id);

      const added = response?.added ?? !inWishlist;
      setInWishlist(added);

      toast.success(
        added
          ? `${product.name} added to wishlist 💚`
          : `${product.name} removed from wishlist`
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update wishlist");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyNow = async () => {
    if (!user) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }
    await handleAddToCart();
    navigate(`/checkout?plantId=${product._id}`);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!reviewComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      const response = await addReviewApi(product._id, {
        rating: reviewRating,
        comment: reviewComment,
      });

      // Add new review to local state
      setReviews((prev) => [response.data, ...prev]);

      setReviewRating(5);
      setReviewComment("");
      toast.success("Review submitted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-700"></div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const imageUrl = product.imagepath
    ? `http://localhost:5050/uploads/${product.imagepath}`
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Images */}
          <div>
            {/* Main Image */}
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-4 overflow-hidden">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-full h-96 object-contain transform transition-transform duration-500 hover:scale-110 cursor-zoom-in"
                />
              ) : (
                <div className="w-full h-96 flex items-center justify-center text-9xl">
                  🌿
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-4 shadow cursor-pointer hover:shadow-lg transition overflow-hidden"
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={`${product.name} ${i}`}
                      className="w-full h-24 object-contain transform transition-transform duration-500 hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-24 flex items-center justify-center text-4xl">
                      🌿
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right - Details */}
          <div>
            <div className="relative flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl primary-font font-bold text-gray-800 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {"★".repeat(4)}
                    {"☆"}
                  </div>
                  <span className="text-gray-600 text-sm">
                    ({reviews.length} reviews)
                  </span>
                </div>
              </div>
              <WishlistButton
                active={inWishlist}
                onClick={handleWishlistClick}
                disabled={isLoading}
              />
            </div>

            <p className="text-xl primary-font font-bold text-green-700 mb-4">
              Rs. {product.price}
            </p>

            <p className="text-gray-600 primary-font mb-6">
              {product.description ||
                "Indoor plants are low-maintenance greenery grown inside to enhance air quality, add beauty, and create a calm, natural atmosphere."}
            </p>

            {/* Stock */}
            <div className="flex items-center  gap-2 mb-6">
              <span
                className={`px-3 py-1 rounded-full primary-font text-sm font-semibold ${
                  product.stock > 10
                    ? "bg-green-100 text-green-700"
                    : product.stock > 0
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.stock > 0
                  ? `In Stock (${product.stock} available)`
                  : "Out of Stock"}
              </span>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm primary-font font-semibold text-gray-700 mb-2">
                Quantity:
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 font-bold"
                >
                  -
                </button>
                <span className="w-12 text-center primary-font font-semibold text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-green-700 hover:bg-green-800 text-white py-3 primary-font rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black py-3 primary-font rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                Buy Now
              </button>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-bold primary-font text-lg mb-4">
                Product Details
              </h3>
              <ul className="space-y-2 primary-font text-gray-700">
                <li>
                  • <strong>Care Instructions:</strong>{" "}
                  {product.careInstructions || "Water when soil feels dry"}
                </li>
                <li>
                  • <strong>Light:</strong> Indirect sunlight
                </li>
                <li>
                  • <strong>Height:</strong> 10-12 inches
                </li>
                <li>
                  • <strong>Pet Friendly:</strong> No
                </li>
                <li>
                  • <strong>Humidity:</strong> 40-60%
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="flex gap-8 border-b mb-6">
            {["info", "care", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 font-semibold capitalize ${
                  activeTab === tab
                    ? "text-green-700 border-b-2 border-green-700"
                    : "text-gray-600"
                }`}
              >
                {tab === "info"
                  ? "Additional Info"
                  : tab === "care"
                  ? "Care Guide"
                  : "Reviews"}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-lg p-8 shadow">
            {activeTab === "info" && (
              <div>
                <h3 className="font-bold text-lg mb-4">
                  Additional Information
                </h3>
                <p className="text-gray-700">
                  They are in pots—that is the basic step by watching
                  pollutants. Many terrace indoor all by watching pollutants.
                  Regular beginners' choice poultices, spider plant, Z-plant,
                  and peace lily must be homes, others, and most space.
                </p>
              </div>
            )}

            {activeTab === "care" && (
              <div>
                <h3 className="font-bold text-lg mb-4">Care Guide</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Water when the top 2 inches of soil are dry</li>
                  <li>• Place in indirect sunlight</li>
                  <li>• Fertilize monthly during growing season</li>
                  <li>• Maintain humidity between 40-60%</li>
                </ul>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h3 className="font-bold text-lg mb-4">Customer Reviews</h3>

                {reviews.length > 0 ? (
                  <ul className="space-y-4 mb-6">
                    {reviews.map((rev) => (
                      <li key={rev._id} className="border-b pb-2">
                        <p className="font-semibold">
                          {rev.user?.name || "User"}
                        </p>
                        <p className="text-yellow-400">
                          {"★".repeat(rev.rating)}
                          {"☆".repeat(5 - rev.rating)}
                        </p>
                        <p className="text-gray-700">{rev.comment}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 mb-4">
                    No reviews yet. Be the first to review this product!
                  </p>
                )}

                {user ? (
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                      <label className="block font-semibold mb-1">
                        Rating:
                      </label>
                      <select
                        value={reviewRating}
                        onChange={(e) =>
                          setReviewRating(Number(e.target.value))
                        }
                        className="border p-2 rounded w-full"
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n} Star{n > 1 && "s"}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">
                        Comment:
                      </label>
                      <textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        rows={4}
                        className="border p-2 rounded w-full"
                        placeholder="Write your review here..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                    >
                      Submit Review
                    </button>
                  </form>
                ) : (
                  <p className="text-gray-600">
                    Please login to leave a review.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
