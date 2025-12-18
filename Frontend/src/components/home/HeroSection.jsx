
const HeroSection = () => {
  // return (
  //   <section className="py-20 px-4 bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background-dark">
  //     <div className="max-w-7xl mx-auto text-center">
  //       <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4 secondary-font">
  //         Welcome to PlantNest 🌿
  //       </h1>
  //       <p className="text-xl md:text-2xl text-muted-light dark:text-muted-dark mb-8">
  //         Discover the perfect plants for your home
  //       </p>
  //       <div className="flex gap-4 justify-center">
  //         <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-semibold transition">
  //           Shop Now
  //         </button>
  //         <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-semibold transition">
  //           Learn More
  //         </button>
  //       </div>
  //     </div>
  //   </section>
  // );
 return (

  <section className="relative bg-white  overflow-hidden ">
  <div className="w-full mx-auto ml-0 px-6 pl-0 grid grid-cols-1 lg:grid-cols-3 items-center gap-16">
    <div className="relative ">
        <img
          src="src/assets/images/leafff.png"
          alt="Plants"
          className="w-full max-h-[520px] object-contain mx-auto"
        />
      </div>


    {/* LEFT CONTENT */}
    <div>
      {/* SEARCH */}
      <div className="mb-10">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-12 pr-4 py-3 rounded-full border border-[#274E36] focus:ring-2 focus:ring-green-600 outline-none shadow-lg"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-700">
            🔍
          </span>
        </div>
      </div>

      {/* TEXT */}
      <h1 className="text-4xl secondary-font font-semibold text-green-900 leading-tight mb-4">
        Welcome to Plant-Nest
      </h1>

      <p className="text-lg secondary-font text-green-800/70 max-w-xl mb-4">
        Discover our curated collection of beautiful, healthy plants that
        will transform your living space into a green sanctuary.
      </p>

      <button className="inline-flex shadow-lg items-center gap-3 bg-[#274E36] text-white px-7 py-2.5 rounded-full hover:bg-green-700 transition">
        Get Started
       <span className="bg-[#EAB87B] text-black secondary-font font-light rounded-full px-3 py-1.5 flex items-center justify-center">
  ➜
</span>
      </button>
    </div>

    {/* RIGHT – CATEGORY CAROUSEL */}
    <div className="relative">
      <div className="overflow-hidden rounded-2xl w-[320px] mx-auto">

        <div className="flex animate-category-carousel ">
           
          {[
            { title: "Indoor Plants",  img:"src/assets/images/indoorpl.png"},
            { title: "Outdoor Plants", img: "src/assets/images/indoorpl.png" },
            { title: "Succulents", img: "src/assets/images/indoorpl.png" },
            { title: "Air Purifying", img: "src/assets/images/indoorpl.png" },
            // duplicate for seamless loop
            { title: "Indoor Plants",  img:"src/assets/images/indoorpl.png"},
          ].map((item, index) => (
            <div
              key={index}
              className="min-w-full bg-[#ffff] p-8 text-center"
            >
              <img
                src={item.img}
                alt={item.title}
                className="h-62 w-full object-contain rounded-2xl shadow-lg  mx-auto "
              />
              <h3 className="text-lg font-medium secondary-font text-green-900 mt-2">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </div>

  </div>
</section>



);



};

export default HeroSection;