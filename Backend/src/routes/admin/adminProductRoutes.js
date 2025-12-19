// const express = require("express");
// const router = express.Router();
// const controller = require("../../controllers/admin/adminProductController");
// const { isAuthenticated, isAdmin } = require("../../middlewares/authMiddleware");

// router.post("/", isAuthenticated, isAdmin, controller.adminCreateProduct);
// router.put("/:id", isAuthenticated, isAdmin, controller.adminUpdateProduct);
// router.delete("/:id", isAuthenticated, isAdmin, controller.adminDeleteProduct);
// router.get("/", isAuthenticated, isAdmin, controller.adminGetAllProducts);

// module.exports = router;

// const express = require("express");
// const router = express.Router();

// const { auth, adminOnly } = require("../../middlewares/authMiddleware");
// const adminProductController = require("../../controllers/admin/adminProductController");

// // All routes protected by auth + adminOnly
// router.post("/", auth, adminOnly, adminProductController.createProduct);
// // router.get("/", auth, adminOnly, adminProductController.getProducts);
// // router.get("/:id", auth, adminOnly, adminProductController.getProduct);
// router.put("/:id", auth, adminOnly, adminProductController.updateProduct);
// router.delete("/:id", auth, adminOnly, adminProductController.deleteProduct);

// module.exports = router;
const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/adminProductController");
const { auth, adminOnly } = require("../../middlewares/authMiddleware");
const upload = require("../../../utils/multer");

/* ================= ADMIN PRODUCT ROUTES ================= */

// Get all products
router.get(
  "/",
  auth,
  adminOnly,
  controller.getAllProducts
);

// Get single product
router.get(
  "/:id",
  auth,
  adminOnly,
  controller.getProductById
);

// Create product with image/video upload
router.post(
  "/",
  auth,
  adminOnly,
  upload.fields([
    { name: "imagepath", maxCount: 1 },
    { name: "filepath", maxCount: 1 }
  ]),
  controller.createProduct
);

// Alternative route for add-product
router.post(
  "/add-product",
  auth,
  adminOnly,
  upload.fields([
    { name: "imagepath", maxCount: 1 },
    { name: "filepath", maxCount: 1 }
  ]),
  controller.createProduct
);

// Update product with image/video
router.put(
  "/:id",
  auth,
  adminOnly,
  upload.fields([
    { name: "imagepath", maxCount: 1 },
    { name: "filepath", maxCount: 1 }
  ]),
  controller.updateProduct
);

// Delete product
router.delete(
  "/:id",
  auth,
  adminOnly,
  controller.deleteProduct
);

module.exports = router;