// // const express = require("express");
// // const router = express.Router();
// // const controller = require("../../controllers/admin/adminCategoryController");
// // const { isAuthenticated, isAdmin } = require("../../middlewares/authMiddleware");
// // const upload = require("../../../utils/multer");

// // router.post("/", isAuthenticated, isAdmin, controller.adminCreateCategory);
// // router.put("/:id", isAuthenticated, isAdmin, controller.adminUpdateCategory);
// // router.delete("/:id", isAuthenticated, isAdmin, controller.adminDeleteCategory);
// // router.get("/", isAuthenticated, isAdmin, controller.adminGetCategories);
// // router.post(
// //     "/add-category",
// //     upload.fields([
// //         { name: "image", maxCount: 1 },
// //         { name: "video", maxCount: 1 }
// //     ]),
// //     controller.addCategory
// // );


// // module.exports = router;
// const express = require("express");
// const router = express.Router();

// const controller = require("../../controllers/admin/adminCategoryController");
// const { auth, adminOnly } = require("../../middlewares/authMiddleware");
// const upload = require("../../../utils/multer");

// /* ================= ADMIN CATEGORY ROUTES ================= */

// // Create category
// router.post(
//   "/",
//   auth,
//   adminOnly,
//   controller.adminCreateCategory
// );

// // Update category
// router.put(
//   "/:id",
//   auth,
//   adminOnly,
//   controller.adminUpdateCategory
// );

// // Delete category
// router.delete(
//   "/:id",
//   auth,
//   adminOnly,
//   controller.adminDeleteCategory
// );

// // Get all categories
// router.get(
//   "/",
//   auth,
//   adminOnly,
//   controller.adminGetCategories
// );

// // Get single category by ID
// router.get(
//   "/:id",
//   auth,
//   adminOnly,
//   controller.adminGetCategoryById
// );

// // Create category with image/video upload
// router.post(
//   "/add-category",
//   auth,
//   adminOnly,
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "video", maxCount: 1 }
//   ]),
//   async (req, res, next) => {
//     try {
//       // Attach file paths to body for controller to save
//       if (req.files) {
//         if (req.files.image) req.body.image = req.files.image[0].path;
//         if (req.files.video) req.body.video = req.files.video[0].path;
//       }
//       await controller.adminCreateCategory(req, res);
//     } catch (err) {
//       next(err);
//     }
//   }
// );
// module.exports = router;
const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/adminCategoryController");
const { auth, adminOnly } = require("../../middlewares/authMiddleware");
const upload = require("../../../utils/multer");

/* ================= ADMIN CATEGORY ROUTES ================= */

// Get all categories
router.get(
  "/",
  auth,
  adminOnly,
  controller.adminGetCategories
);

// Get single category by ID
router.get(
  "/:id",
  auth,
  adminOnly,
  controller.adminGetCategoryById
);

// Create category with image upload
router.post(
  "/",
  auth,
  adminOnly,
  upload.fields([{ name: "image", maxCount: 1 }]), // ✅ Use fields method
  controller.adminCreateCategory
);

// Alternative route (keeping for compatibility)
router.post(
  "/add-category",
  auth,
  adminOnly,
  upload.fields([{ name: "image", maxCount: 1 }]), // ✅ Use fields method
  controller.adminCreateCategory
);

// Update category
router.put(
  "/:id",
  auth,
  adminOnly,
  upload.fields([{ name: "image", maxCount: 1 }]), // ✅ Use fields method
  controller.adminUpdateCategory
);

// Delete category
router.delete(
  "/:id",
  auth,
  adminOnly,
  controller.adminDeleteCategory
);

module.exports = router;