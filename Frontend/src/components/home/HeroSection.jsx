


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPlantsApi } from "../../services/plantService";

const HeroSection = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const data = await getAllPlantsApi();
        setPlants(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch plants", err);
      }
    };
    fetchPlants();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPlants([]);
      return;
    }

    const results = plants.filter(
      (plant) =>
        plant?.name &&
        plant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredPlants(results);
  }, [searchTerm, plants]);

  const handleSelectPlant = (id) => {
    setSearchTerm("");
    setFilteredPlants([]);
    navigate(`/products/${id}`);
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF8F4]">
      {/* Decorative blur */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#EAB87B]/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-8">
          {/* 🔍 SEARCH (UNCHANGED) */}
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search plants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-[#274E36] focus:ring-2 focus:ring-green-600 outline-none shadow-lg"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-700">
              🔍
            </span>

            {filteredPlants.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white shadow-xl rounded-2xl z-50 max-h-60 overflow-y-auto">
                {filteredPlants.map((plant) => (
                  <div
                    key={plant._id}
                    onClick={() => handleSelectPlant(plant._id)}
                    className="px-5 py-3 cursor-pointer hover:bg-green-50 text-green-900"
                  >
                    🌱 {plant.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* HEADLINE */}
          <h1 className="text-5xl lg:text-6xl secondary-font font-semibold text-green-900 leading-tight">
            Fresh & Healthy <br />
            <span className="text-[#E07A5F]">Plants</span> for Your Home
          </h1>

          <p className="text-lg text-green-800/70 primary-font max-w-xl">
            Discover our curated collection of vibrant, healthy plants designed
            to bring life, calm, and beauty into your living space.
          </p>

          {/* CTA (UNCHANGED) */}
           <button 
            onClick={() => navigate("/products")}
            className="inline-flex shadow-lg items-center gap-3 bg-[#274E36] text-white px-5 py-2 rounded-full hover:bg-green-700 transition"
          >
            Get Started
            <span className="bg-[#EAB87B] text-black secondary-font font-light rounded-full px-2 py-1 flex items-center justify-center">
              ➜
            </span>
          </button>
          {/* <button className="inline-flex shadow-lg items-center gap-3 bg-[#274E36] text-white px-7 py-2.5 rounded-full hover:bg-green-700 transition">
            Get Started
            <span className="bg-[#EAB87B] text-black rounded-full px-3 py-1.5">
              ➜
            </span>
          </button> */}
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center">
          <div className="relative w-[360px] h-[360px] rounded-full bg-white shadow-2xl flex items-center justify-center">
            <img
              src="src/assets/images/plantts.png"
              alt="Plants"
              className="w-74 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
