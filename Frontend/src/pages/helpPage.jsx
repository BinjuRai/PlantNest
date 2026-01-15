import { ShoppingCart, Heart, Search, User, CreditCard, CheckCircle } from "lucide-react";

const HelpPage = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-[#274E36] mb-4">
          How to Use PlantNest 🌿
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          PlantNest makes discovering, saving, and purchasing plants simple.
          Follow this step-by-step guide to enjoy a smooth shopping experience.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Step 1 */}
        <HelpCard
          icon={<Search />}
          title="Browse & Search Plants"
          description="Explore featured plants on the homepage or use the search bar to find plants by name, category, or type."
        />

        {/* Step 2 */}
        <HelpCard
          icon={<User />}
          title="View Plant Details"
          description="Click on a plant to view detailed information including price, stock availability, and care instructions."
        />

        {/* Step 3 */}
        <HelpCard
          icon={<Heart />}
          title="Add to Wishlist"
          description="Save plants you like to your wishlist — your personal plant nursery for future purchases."
        />

        {/* Step 4 */}
        <HelpCard
          icon={<ShoppingCart />}
          title="Add to Cart"
          description="Add plants to your cart and manage quantities before proceeding to checkout."
        />

        {/* Step 5 */}
        <HelpCard
          icon={<User />}
          title="Login or Register"
          description="Sign in or create an account to continue with checkout and track your orders."
        />

        {/* Step 6 */}
        <HelpCard
          icon={<CreditCard />}
          title="Checkout & Payment"
          description="Choose your preferred payment method such as Cash on Delivery or E-sewa and confirm your order."
        />

        {/* Step 7 */}
        <HelpCard
          icon={<CheckCircle />}
          title="Order Successful"
          description="Receive confirmation after payment and track your order status from your profile."
        />
      </div>

      {/* Golden Path */}
      <div className="mt-20 bg-[#cdddcf] rounded-3xl p-10">
        <h2 className="text-3xl font-serif font-semibold text-[#274E36] mb-6">
          🚀 Quick Shopping Path
        </h2>

        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-gray-700">
          <li>1. View Products</li>
          <li>2. Search Plant</li>
          <li>3. View Details</li>
          <li>4. Buy Now</li>
          <li>5. Login / Register</li>
          <li>6. Checkout</li>
          <li>7. Payment</li>
          <li>8. Order Placed</li>
        </ol>
      </div>
    </section>
  );
};

export default HelpPage;

/* -----------------------------
Reusable Help Card Component
------------------------------ */
const HelpCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#EAB87B] text-[#274E36] mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-[#274E36] mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};
