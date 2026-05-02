
const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/adminProductController");
const { authenticate, isAdmin } = require("../../middlewares/authMiddleware");
const upload = require("../../../utils/multer");


router.get(
  "/",
  authenticate,
  isAdmin,
  controller.getAllProducts
);


router.get(
  "/:id",
  authenticate,
  isAdmin,
  controller.getProductById
);


router.post(
  "/",
  authenticate,
  isAdmin,
  upload.fields([
    { name: "imagepath", maxCount: 1 },
    { name: "filepath", maxCount: 1 }
  ]),
  controller.createProduct
);


router.post(
  "/add-product",
  authenticate,
  isAdmin,
  upload.fields([
    { name: "imagepath", maxCount: 1 },
    { name: "filepath", maxCount: 1 }
  ]),
  controller.createProduct
);


router.put(
  "/:id",
  authenticate,
  isAdmin,
  upload.fields([
    { name: "imagepath", maxCount: 1 },
    { name: "filepath", maxCount: 1 }
  ]),
  controller.updateProduct
);


router.delete(
  "/:id",
  authenticate,
  isAdmin,
  controller.deleteProduct
);

module.exports = router;