import { useQuery } from "@tanstack/react-query";
import { getAllPlantsApi } from "../services/plantService";
import { getAllCategoriesApi } from "../services/categoryService";
import { toast } from "react-toastify";

import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategorySection";
import PlantSection from "../components/home/PlantSection";
import WhyChoose from "../components/home/WhyChoose";
import CTASection from "../components/home/CTASection";
import FavouriteProducts from "../components/home/FavouriteProduct";
import indoorPlant from "/src/assets/images/indoorpl.png";

const Homepage = () => {
  const {
    data: plants,
    isLoading: plantsLoading,
    error: plantsError,
    refetch: refetchPlants,
  } = useQuery({
    queryKey: ["plants"],
    queryFn: getAllPlantsApi,
  });

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategoriesApi,
  });

  const handleAddToCart = (plant) => {
    toast.success(`${plant.name} added to cart! 🛒`);
  };

  if (plantsLoading || categoriesLoading) {
    return <Loading message="Loading..." />;
  }

  if (plantsError) {
    return (
      <ErrorMessage
        title="Failed to load plants"
        message={plantsError.response?.data?.message || plantsError.message}
        onRetry={refetchPlants}
      />
    );
  }

  // Error state for categories
  if (categoriesError) {
    console.error("Categories error:", categoriesError);
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <HeroSection />

      {categories && categories.length > 0 && (
        <CategorySection categories={categories} />
      )}

      <PlantSection plants={plants} onAddToCart={handleAddToCart} />
      <WhyChoose />
      <FavouriteProducts plants={plants || samplePlants} />
      <CTASection />
    </div>
  );
};

export default Homepage;
