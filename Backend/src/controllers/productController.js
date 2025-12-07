const productService = require("../services/productService");

class ProductController {
  async createProduct(req, res) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json({ success: true, product });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async getProducts(req, res) {
    try {
      const products = await productService.getAllProducts();
      res.json({ success: true, products });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getProduct(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      if (!product)
        return res.status(404).json({ success: false, message: "Product not found" });

      res.json({ success: true, product });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const updated = await productService.updateProduct(req.params.id, req.body);
      res.json({ success: true, updated });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      await productService.deleteProduct(req.params.id);
      res.json({ success: true, message: "Product deleted" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = new ProductController();
