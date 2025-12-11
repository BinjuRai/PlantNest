const Product = require("../models/productModel");

module.exports = async function (req, res, next) {
  try {
    const items = req.body.items || [];

    for (let item of items) {
      const product = await Product.findById(item.product);

      if (!product) return res.status(404).json({ message: "Product not found" });

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`,
        });
      }
    }

    next();
  } catch (err) {
    res.status(500).json({ message: "Stock validation failed" });
  }
};
