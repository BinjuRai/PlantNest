

const express = require("express");
const router = express.Router();

const upload = require("../../src/middlewares/fileuploads");
const { authenticate, isAdmin } = require("../../src/middlewares/authMiddleware");
const blogController = require("../controllers/admin/blogController");

router.post(
  "/blogs",
  authenticate,
  isAdmin,
  upload.single("image"),
  blogController.createBlog
);

router.get("/blogs", blogController.getAllBlogs);

router.put(
  "/blogs/:id",
  authenticate,
  isAdmin,
  upload.single("image"),
  blogController.updateBlog
);

router.delete(
  "/blogs/:id",
  authenticate,
  isAdmin,
  blogController.deleteBlog
);

module.exports = router;
