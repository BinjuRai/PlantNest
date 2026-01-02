

import { useNavigate } from "react-router-dom";
import PlantCard from "./PlantCard";

const PlantSection = ({ plants }) => {
  const navigate = useNavigate();
  
  // Limit to 4 products for homepage
  const displayPlants = plants?.slice(0, 4) || [];

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-serif font-semibold text-[#274E36] dark:text-green-100">
            Our Latest Products
          </h2>
          
          <button 
            onClick={() => navigate("/products")}
            className="inline-flex shadow-lg items-center gap-3 bg-[#274E36] text-white px-5 py-2 rounded-full hover:bg-green-700 transition"
          >
            View More
            <span className="bg-[#EAB87B] text-black secondary-font font-light rounded-full px-2 py-1 flex items-center justify-center">
              ➜
            </span>
          </button>
        </div>
        <div className=" bg-[#cdddcf] rounded-3xl p-6">
        {displayPlants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
            {displayPlants.map((plant) => (
              <PlantCard key={plant._id} plant={plant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🌿</div>
            <p className="text-xl text-muted-light dark:text-muted-dark">
              No plants available yet
            </p>
          </div>
        )}

        </div>
      </div>
    </section>
  );
};

export default PlantSection;