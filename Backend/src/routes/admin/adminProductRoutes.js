const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/adminProductController");
const { isAuthenticated, isAdmin } = require("../../middlewares/authMiddleware");

router.post("/", isAuthenticated, isAdmin, controller.adminCreateProduct);
router.put("/:id", isAuthenticated, isAdmin, controller.adminUpdateProduct);
router.delete("/:id", isAuthenticated, isAdmin, controller.adminDeleteProduct);
router.get("/", isAuthenticated, isAdmin, controller.adminGetAllProducts);

module.exports = router;
