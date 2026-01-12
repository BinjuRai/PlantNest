import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What types of plants does PlantNest sell?",
    answer:
      "PlantNest offers a wide variety of plants including indoor plants, outdoor plants, hanging plants, succulents, cacti, flowering plants, and air-purifying plants suitable for homes and offices.",
  },
  {
    question: "Do you deliver plants to my location?",
    answer:
      "Yes! We currently deliver across Lalitpur, Kathmandu, and nearby areas. Delivery availability may vary based on your location and plant type.",
  },
  {
    question: "Is there a delivery fee?",
    answer:
      "Yes, a small delivery fee is applied depending on your location and order size. The exact delivery charge will be shown clearly at checkout before payment.",
  },
  {
    question: "How are plants packed for delivery?",
    answer:
      "All plants are carefully packed using eco-friendly materials to protect the roots, soil, and leaves. We ensure your plant arrives fresh, healthy, and damage-free.",
  },
  {
    question: "Can I choose a delivery date?",
    answer:
      "Currently, we deliver within 1–3 business days after order confirmation. Specific delivery date selection will be available soon.",
  },
  {
    question: "What if my plant arrives damaged?",
    answer:
      "If your plant arrives damaged, please contact us within 24 hours with photos. We will arrange a replacement or refund based on the issue.",
  },
  {
    question: "Do you offer plant care guidance?",
    answer:
      "Absolutely! Each plant comes with basic care instructions. You can also find detailed care tips on our website or contact our support team anytime.",
  },
  {
    question: "Can I cancel or modify my order?",
    answer:
      "Orders can be canceled or modified before dispatch. Once the order is shipped, cancellation may not be possible.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept online payments, digital wallets, and cash on delivery (COD) for eligible locations.",
  },
  {
    question: "Do you sell pots and accessories?",
    answer:
      "Yes! Along with plants, we also offer pots, planters, soil mixes, and basic plant care accessories.",
  },
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border border-green-200 rounded-lg overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 transition"
      >
        <span className="font-semibold text-left text-green-900">
          {question}
        </span>
        <ChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="p-4 bg-white text-gray-700 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#f6fbf8] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold secondary-font text-green-900 mb-4">
            🌿 Frequently Asked Questions
          </h1>
          <p className="text-gray-600  primary-font text-lg">
            Everything you need to know about buying plants from PlantNest
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4 primary-font">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>

        {/* Extra CTA */}
        <div className="mt-14 text-center bg-green-900 text-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold primary-font mb-2">
            Still have questions? 🌱
          </h2>
          <p className="mb-4 primary-font text-white/90">
            Our plant experts are here to help you grow happy plants.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center primary-font justify-center bg-[#EAB87B] hover:bg-[#d9a768] text-black px-6 py-3 rounded-lg font-semibold transition hover:shadow-md"
          >
            Contact PlantNest Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
