const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    scientificName: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    images: [{ type: String }],
    stock: { type: Number, default: 0 },
    plantType: {
      type: String,
      enum: ["indoor", "outdoor", "hanging", "succulent", "flowering"]
    },
    careInstructions: { type: String },
    isFeatured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
