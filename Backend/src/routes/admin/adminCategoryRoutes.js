const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/adminCategoryController");
const { isAuthenticated, isAdmin } = require("../../middlewares/authMiddleware");

router.post("/", isAuthenticated, isAdmin, controller.adminCreateCategory);
router.put("/:id", isAuthenticated, isAdmin, controller.adminUpdateCategory);
router.delete("/:id", isAuthenticated, isAdmin, controller.adminDeleteCategory);
router.get("/", isAuthenticated, isAdmin, controller.adminGetCategories);

module.exports = router;
