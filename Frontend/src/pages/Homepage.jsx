// import { Heart} from "lucide-react";

// export default function PlantNest() {
//   return (
//     <div className="font-sans text-slate-800">
     
//       {/* Hero Section */}
//       <section className="px-8 py-16 grid md:grid-cols-2 gap-10 items-center">
//         <div>
//           <h1 className="text-4xl font-semibold mb-4">Welcome to Plant-Nest</h1>
//           <p className="text-slate-600 mb-6">
//             Discover our curated collection of beautiful, healthy plants that
//             will transform your living space into a green sanctuary.
//           </p>
//           <button className="bg-green-700 text-white px-6 py-2 rounded">
//             Get Started
//           </button>
//         </div>

//         <div className="flex justify-center">
//           <div className="w-72 h-72 bg-green-100 rounded-full" />
//         </div>
//       </section>

//       {/* Latest Products */}
//       <section className="px-8 py-12 bg-green-50">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold">Latest updated Products</h2>
//           <button className="text-sm bg-green-700 text-white px-4 py-1 rounded">
//             View More
//           </button>
//         </div>

//         <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {[1, 2, 3, 4].map((item) => (
//             <div
//               key={item}
//               className="bg-white rounded-xl shadow p-4 relative"
//             >
//               <Heart className="absolute top-3 right-3 text-green-700" />
//               <div className="h-40 bg-slate-100 rounded mb-4" />
//               <h3 className="font-medium">Indoor Plants one</h3>
//               <p className="text-sm text-slate-600">Rs. 500</p>
//               <div className="flex gap-2 mt-3">
//                 <button className="flex-1 border border-green-700 text-green-700 text-sm py-1 rounded">
//                   Add to cart
//                 </button>
//                 <button className="flex-1 bg-green-700 text-white text-sm py-1 rounded">
//                   Buy Now
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Why Choose Us */}
//       <section className="bg-green-700 text-white py-16 px-8">
//         <h2 className="text-3xl font-semibold text-center mb-10">
//           Why Choose Plant Nest?
//         </h2>

//         <div className="grid md:grid-cols-3 gap-10 items-center">
//           <div className="space-y-6 text-sm">
//             <p>✔ Healthy & Fresh Plants</p>
//             <p>✔ Fast Delivery</p>
//           </div>

//           <div className="flex justify-center">
//             <div className="w-52 h-52 bg-white rounded-full" />
//           </div>

//           <div className="space-y-6 text-sm">
//             <p>✔ Eco Friendly</p>
//             <p>✔ Customer Support</p>
//           </div>
//         </div>
//       </section>

//       {/* Favourite Products */}
//       <section className="px-8 py-16">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold">Our Favourite Products</h2>
//           <button className="text-sm bg-green-700 text-white px-4 py-1 rounded">
//             View More
//           </button>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           <div className="md:row-span-2 bg-slate-100 rounded-xl h-96" />
//           <div className="bg-slate-100 rounded-xl h-44" />
//           <div className="bg-slate-100 rounded-xl h-44" />
//           <div className="bg-slate-100 rounded-xl h-44" />
//           <div className="bg-slate-100 rounded-xl h-44" />
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="relative py-20 px-8 bg-green-100 text-center">
//         <h2 className="text-3xl font-semibold mb-4">
//           Start Your Plant Journey Today.
//         </h2>
//         <p className="text-slate-700 mb-6">
//           Join thousands of happy plant parents and transform your space.
//         </p>
//         <button className="bg-green-700 text-white px-6 py-2 rounded">
//           Browse Collection
//         </button>
//       </section>

      
//     </div>
//   );
// }
import { useQuery } from "@tanstack/react-query";
import { getAllPlantsApi } from "../services/plantService";
import { getAllCategoriesApi } from "../services/categoryService";
import { toast } from "react-toastify";

// Components
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategorySection";
import PlantSection from "../components/home/PlantSection";
import WhyChoose from "../components/home/WhyChoose";
import CTASection from "../components/home/CTASection";
import indoorPlant from "/src/assets/images/indoorpl.png";
import FavouriteProducts from "../components/home/FavouriteProduct";


const samplePlants = [
  {
    _id: "1",
    name: "Monstera Deliciosa",
    price: 29.99,
    stock: 10,
    isWishlisted: true,
    imagepath: indoorPlant, // 👈 no image yet
  },
  {
    _id: "2",
    name: "Snake Plant",
    price: 19.99,
    stock: 5,
    isWishlisted: false,
    imagepath: null,
  },
  {
    _id: "3",
    name: "Peace Lily",
    price: 24.99,
    stock: 8,
    isWishlisted: false,
    imagepath: null,
  },
  {
    _id: "4",
    name: "Fiddle Leaf Fig",
    price: 39.99,
    stock: 2,
    isWishlisted: true,
    imagepath: null,
  },
  {
    _id: "5",
    name: "Aloe Vera",
    price: 14.99,
    stock: 12,
    isWishlisted: false,
    imagepath: null,
  },
];

const Homepage = () => {
  
  // Fetch plants
  const { 
    data: plants, 
    isLoading: plantsLoading, 
    error: plantsError,
    refetch: refetchPlants 
  } = useQuery({
    queryKey: ["plants"],
    queryFn: getAllPlantsApi,
  });

  // Fetch categories
  const { 
    data: categories, 
    isLoading: categoriesLoading,
    error: categoriesError 
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategoriesApi,
  });

  // Handle add to cart (for now just show toast)
  const handleAddToCart = (plant) => {
    toast.success(`${plant.name} added to cart! 🛒`);
    // TODO: Implement actual cart functionality
  };

  // Loading state
  if (plantsLoading || categoriesLoading) {
    return <Loading message="Loading plants..." />;
  }

  // Error state
  if (plantsError) {
    return (
      <ErrorMessage 
        title="Failed to load plants"
        message={plantsError.response?.data?.message || plantsError.message}
        onRetry={refetchPlants}
      />
    );
  }


  // Log for debugging
  console.log("Plants data:", plants);
  console.log("Categories data:", categories);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <HeroSection />
      <CategorySection categories={categories} />
      <PlantSection plants={plants} onAddToCart={handleAddToCart} />
      <WhyChoose />
    
     <FavouriteProducts plants={samplePlants} />


      <CTASection />
    </div>
  );
};

export default Homepage;