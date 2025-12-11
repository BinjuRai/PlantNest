const Product = require("../../models/productModel");

exports.adminCreateProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.json({ message: "Product created", newProduct });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.adminUpdateProduct = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.adminDeleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.adminGetAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("category");
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
