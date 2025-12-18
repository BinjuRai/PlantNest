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

const controller = require("../../controllers/admin/adminProductController"); // your ProductController
const { auth, adminOnly } = require("../../middlewares/authMiddleware");
const upload = require("../../../utils/multer");

/* ================= ADMIN PRODUCT ROUTES ================= */

// Create product (basic)
router.post(
  "/",
  auth,
  adminOnly,
  controller.createProduct
);

// Create product with image/video upload
router.post(
  "/add-product",
  auth,
  adminOnly,
  upload.fields([
    { name: "imagepath", maxCount: 1 },
    { name: "filepath", maxCount: 1 }
  ]),
  async (req, res, next) => {
    try {
      if (req.files) {
        if (req.files.imagepath) req.body.imagepath = req.files.imagepath[0].path;
        if (req.files.filepath) req.body.filepath = req.files.filepath[0].path;
      }
      await controller.createProduct(req, res);
    } catch (err) {
      next(err);
    }
  }
);

// Update product (basic)
router.put(
  "/:id",
  auth,
  adminOnly,
  controller.updateProduct
);

// Update product with image/video
router.put(
  "/update/:id",
  auth,
  adminOnly,
  upload.fields([
    { name: "imagepath", maxCount: 1 },
    { name: "filepath", maxCount: 1 }
  ]),
  async (req, res, next) => {
    try {
      if (req.files) {
        if (req.files.imagepath) req.body.imagepath = req.files.imagepath[0].path;
        if (req.files.filepath) req.body.filepath = req.files.filepath[0].path;
      }
      await controller.updateProduct(req, res);
    } catch (err) {
      next(err);
    }
  }
);

// Delete product
router.delete(
  "/:id",
  auth,
  adminOnly,
  controller.deleteProduct
);

// Get all products
router.get(
  "/",
  auth,
  adminOnly,
  controller.getProducts
);

// Get single product
router.get(
  "/:id",
  auth,
  adminOnly,
  controller.getProduct
);

module.exports = router;

