// const categoryService = require("../services/categoryService");

// class CategoryController {
//   async createCategory(req, res) {
//     try {
//       const category = await categoryService.createCategory(req.body);
//       res.status(201).json({ success: true, category });
//     } catch (err) {
//       res.status(400).json({ success: false, message: err.message });
//     }
//   }

//   async getCategories(req, res) {
//     try {
//       const categories = await categoryService.getCategories();
//       res.json({ success: true, categories });
//     } catch (err) {
//       res.status(500).json({ success: false, message: err.message });
//     }
//   }

//   async getCategory(req, res) {
//     try {
//       const category = await categoryService.getCategoryById(req.params.id);
//       if (!category)
//         return res.status(404).json({ success: false, message: "Category not found" });

//       res.json({ success: true, category });
//     } catch (err) {
//       res.status(500).json({ success: false, message: err.message });
//     }
//   }

//   async updateCategory(req, res) {
//     try {
//       const updated = await categoryService.updateCategory(req.params.id, req.body);
//       res.json({ success: true, updated });
//     } catch (err) {
//       res.status(400).json({ success: false, message: err.message });
//     }
//   }

//   async deleteCategory(req, res) {
//     try {
//       await categoryService.deleteCategory(req.params.id);
//       res.json({ success: true, message: "Category deleted" });
//     } catch (err) {
//       res.status(500).json({ success: false, message: err.message });
//     }
//   }
// }
const categoryService = require("../services/categoryService");

exports.getCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAll();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch categories" });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await categoryService.getById(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });

        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ message: "Error fetching category" });
    }
};

// module.exports = new CategoryController();
