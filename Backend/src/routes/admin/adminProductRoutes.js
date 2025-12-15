// const express = require("express");
// const router = express.Router();
// const controller = require("../../controllers/admin/adminProductController");
// const { isAuthenticated, isAdmin } = require("../../middlewares/authMiddleware");

// router.post("/", isAuthenticated, isAdmin, controller.adminCreateProduct);
// router.put("/:id", isAuthenticated, isAdmin, controller.adminUpdateProduct);
// router.delete("/:id", isAuthenticated, isAdmin, controller.adminDeleteProduct);
// router.get("/", isAuthenticated, isAdmin, controller.adminGetAllProducts);

// module.exports = router;

const express = require("express");
const router = express.Router();

const { auth, adminOnly } = require("../../middlewares/authMiddleware");
const adminProductController = require("../../controllers/admin/adminProductController");

// All routes protected by auth + adminOnly
router.post("/", auth, adminOnly, adminProductController.createProduct);
// router.get("/", auth, adminOnly, adminProductController.getProducts);
// router.get("/:id", auth, adminOnly, adminProductController.getProduct);
router.put("/:id", auth, adminOnly, adminProductController.updateProduct);
router.delete("/:id", auth, adminOnly, adminProductController.deleteProduct);

module.exports = router;
