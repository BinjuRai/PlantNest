const Product = require("../models/productModel");

module.exports = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  req.product = product;
  next();
};
