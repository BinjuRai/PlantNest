// import PlantCard from "./PlantCard";

// const PlantSection = ({ plants, onAddToCart }) => {
//   return (
//     <section className="py-12 px-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-3xl font-bold text-text-light dark:text-text-dark">
//             Our Plants
//           </h2>
//           <div className="flex gap-2">
//             <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition">
//               All
//             </button>
//             <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:border-primary hover:text-primary transition">
//               Featured
//             </button>
//           </div>
//         </div>
        
//         {plants && plants.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {plants.map((plant) => (
//               <PlantCard 
//                 key={plant._id} 
//                 plant={plant}
//                 onAddToCart={onAddToCart}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16">
//             <div className="text-6xl mb-4">🌿</div>
//             <p className="text-xl text-muted-light dark:text-muted-dark">
//               No plants available yet
//             </p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default PlantSection;

import PlantCard from "./PlantCard";

const PlantSection = ({ plants }) => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-text-light dark:text-text-dark">
            Our Plants
          </h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition">
              All
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:border-primary hover:text-primary transition">
              Featured
            </button>
          </div>
        </div>
        
        {plants && plants.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {plants.map((plant) => (
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
</section>);
};
export default PlantSection;
