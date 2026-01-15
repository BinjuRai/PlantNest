

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllPlantsApi } from "../services/plantService";
import { getAllCategoriesApi } from "../services/categoryService";
import PlantCard from "../components/home/PlantCard";
import CategoryTabs from "../components/common/CategoryTabs";
import { toast } from "react-toastify";

const AllProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [selectedPlantType, setSelectedPlantType] = useState(
    searchParams.get("type") || "all"
  );
  const [sortBy, setSortBy] = useState(
    searchParams.get("sort") || "newest"
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get("minPrice") || "",
    max: searchParams.get("maxPrice") || "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const params = {};
    if (selectedCategory !== "all") params.category = selectedCategory;
    if (selectedPlantType !== "all") params.type = selectedPlantType;
    if (sortBy !== "newest") params.sort = sortBy;
    if (searchQuery) params.search = searchQuery;
    if (priceRange.min) params.minPrice = priceRange.min;
    if (priceRange.max) params.maxPrice = priceRange.max;
    setSearchParams(params);
  }, [
    selectedCategory,
    selectedPlantType,
    sortBy,
    searchQuery,
    priceRange,
    setSearchParams,
  ]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        getAllPlantsApi(),
        getAllCategoriesApi(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products
    .filter((product) => {
      if (
        selectedCategory !== "all" &&
        product.categoryId?._id !== selectedCategory
      )
        return false;

      if (
        selectedPlantType !== "all" &&
        product.plantType !== selectedPlantType
      )
        return false;

      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;

      if (priceRange.min && product.price < Number(priceRange.min))
        return false;

      if (priceRange.max && product.price > Number(priceRange.max))
        return false;

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedPlantType("all");
    setSortBy("newest");
    setSearchQuery("");
    setPriceRange({ min: "", max: "" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-14 w-14 rounded-full border-4 border-green-900/20 border-t-green-800 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F8F6]">
      {/* HERO */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#6a8b76] via-[#508967] to-[#1d472e] text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_white,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <h1 className="text-5xl md:text-5xl font-semibold secondary-font mb-4">
            Our Plants
          </h1>
          <p className="text-lg text-green-100 max-w-xl">
            Thoughtfully grown plants for calm, healthy living spaces
          </p>
        </div>
      </div>

      {/* CATEGORY TABS */}
      <div className="bg-[#F0F4F1] border-b border-green-900/10">
        <CategoryTabs
          categories={categories}
          active={selectedCategory}
          onChange={(id) => setSelectedCategory(id)}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* FILTERS */}
          <aside className="lg:w-72">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-green-900/10 p-6 sticky top-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-serif font-semibold tracking-wide">
                  Filters
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-green-700 hover:underline"
                >
                  Clear
                </button>
              </div>

              {/* SEARCH */}
              <div className="mb-6">
                <label className="text-sm font-medium text-green-900/70">
                  Search
                </label>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search plants..."
                  className="mt-2 w-full px-4 py-2.5 rounded-xl border border-green-900/20 bg-white/70 focus:ring-2 focus:ring-green-700/30"
                />
              </div>

              {/* CATEGORY */}
              <div className="mb-6">
                <label className="text-sm font-medium text-green-900/70">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="mt-2 w-full px-4 py-2.5 rounded-xl border border-green-900/20 bg-white/70"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* PLANT TYPE */}
              <div className="mb-6">
                <label className="text-sm font-medium text-green-900/70">
                  Plant Type
                </label>
                <select
                  value={selectedPlantType}
                  onChange={(e) => setSelectedPlantType(e.target.value)}
                  className="mt-2 w-full px-4 py-2.5 rounded-xl border border-green-900/20 bg-white/70"
                >
                  <option value="all">All Types</option>
                  <option value="indoor">Indoor</option>
                  <option value="outdoor">Outdoor</option>
                  <option value="hanging">Hanging</option>
                  <option value="succulent">Succulent</option>
                  <option value="flowering">Flowering</option>
                </select>
              </div>

              {/* PRICE */}
              <div className="mb-6">
                <label className="text-sm font-medium text-green-900/70">
                  Price Range
                </label>
                <div className="flex gap-3 mt-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, min: e.target.value })
                    }
                    className="w-1/2 px-3 py-2 rounded-xl border border-green-900/20"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, max: e.target.value })
                    }
                    className="w-1/2 px-3 py-2 rounded-xl border border-green-900/20"
                  />
                </div>
              </div>

              {/* SORT */}
              <div>
                <label className="text-sm font-medium text-green-900/70">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="mt-2 w-full px-4 py-2.5 rounded-xl border border-green-900/20 bg-white/70"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name A–Z</option>
                  <option value="name-desc">Name Z–A</option>
                </select>
              </div>
            </div>
          </aside>

          {/* PRODUCTS */}
          <main className="flex-1 fade-in">
            <div className="flex justify-between items-center mb-8">
              <p className="text-sm tracking-wide text-green-900/70">
                Showing{" "}
                <span className="font-semibold text-green-900">
                  {filteredProducts.length}
                </span>{" "}
                plants
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {filteredProducts.map((plant) => (
                  <PlantCard key={plant._id} plant={plant} />
                ))}
              </div>
            ) : (
              <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-green-900/10 p-16 text-center">
                <div className="text-5xl mb-6">🌱</div>
                <h3 className="text-2xl font-serif font-semibold mb-2">
                  No plants found
                </h3>
                <p className="text-green-900/70 mb-8">
                  Try adjusting your filters or explore another category
                </p>
                <button
                  onClick={clearFilters}
                  className="px-8 py-3 rounded-full bg-[#274E36] text-white hover:bg-[#1f3d2a] transition"
                >
                  Clear filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;
