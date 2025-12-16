import { FavouriteCard } from "../card/FavouriteProductCard.jsx";

export default function FavouriteProducts({ plants }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-serif font-semibold text-[#274E36] dark:text-green-100">
          Our Favourite Products
        </h2>
        
        <button className="inline-flex shadow-lg items-center gap-3 bg-[#274E36] text-white px-5 py-2 rounded-full hover:bg-green-700 transition">
         View More
        <span className="bg-[#EAB87B] text-black secondary-font font-light rounded-full px-2 py-1 flex items-center justify-center">
          ➜
        </span>
      </button>
      </div>

      <div className="bg-[#cdddcf] dark:bg-[#3b4f44] rounded-3xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="col-span-2 row-span-2">
            <FavouriteCard plant={plants[0]} large />
          </div>

          {plants.slice(1, 5).map((plant) => (
            <FavouriteCard key={plant._id} plant={plant} />
          ))}
        </div>
      </div>
      
    </section>
    
  );
  
}

