import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useAuth } from "../auth/authProvider";
import { Minus, Plus, Trash2 } from "lucide-react";

const CartPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, cartCount, loading, fetchCart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [user]);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(productId, newQuantity);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-700"></div>
      </div>
    );
  }

  const items = cart?.items || [];
  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? 100 : 0; // Free shipping over certain amount
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some plants to get started!</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-md p-6 flex items-center gap-6"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {item.product?.imagepath ? (
                      <img
                        src={`http://localhost:5050/uploads/${item.product.imagepath}`}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        🌿
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {item.product?.name || "Product"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.product?.plantType || "Indoor Plants"}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-2">
                    <button
                      onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 transition"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-800">
                      Rs. {(item.product?.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item.product._id)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `Rs. ${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Discount</span>
                    <span>Rs. 0</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span>Rs. {total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-lg font-semibold transition mb-3"
                >
                  Proceed to checkout
                </button>

                <button
                  onClick={() => navigate("/products")}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition mb-3"
                >
                  Continue Shopping
                </button>

                <div className="text-center text-sm text-gray-600 mt-4">
                  <p>🚚 Free Shipping</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;