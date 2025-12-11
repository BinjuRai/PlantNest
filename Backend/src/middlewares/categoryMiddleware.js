const Category = require("../models/categoryModel");

module.exports = async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });

  req.category = category;
  next();
};

