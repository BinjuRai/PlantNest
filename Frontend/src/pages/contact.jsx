export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      <h1 className="text-4xl secondary-font font-bold text-green-700 mb-10">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-12">

     
        <div className="space-y-6 text-lg">
          <p>
            📞 <a href="tel:+9779800000000" className="text-green-700 underline">
              9800000000
            </a>
          </p>
          <p>
            ✉️ <a href="mailto:plantnest@gmail.com" className="text-green-700 underline">
              plantnest@gmail.com
            </a>
          </p>
          <p>📍 Godawari, Lalitpur, Nepal</p>

          {/* MAP */}
          <iframe
            title="PlantNest Location"
            className="w-full h-64 rounded-xl border"
            src="https://www.google.com/maps?q=Godawari,Lalitpur,Nepal&output=embed"
            loading="lazy"
          />
        </div>

        {/* CONTACT FORM */}
        <form className="space-y-5 bg-green-50 p-8 rounded-xl shadow">
          <h2 className="text-2xl font-semibold text-green-700">
            Send us a Message
          </h2>

          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded border"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded border"
            required
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-3 rounded border h-32"
            required
          />

          <button className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 transition">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
