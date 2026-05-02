const express = require("express");
const router = express.Router();
const AdminUserController = require("../../controllers/admin/adminUserController");
const { authenticate, isAdmin } = require("../../middlewares/authMiddleware");


router.use(authenticate, isAdmin);


router.get("/", AdminUserController.getAllUsers);


router.get("/stats", AdminUserController.getUserStats);


router.get("/:userId", AdminUserController.getUserById);


router.post("/", AdminUserController.createUser);


router.put("/:userId/role", AdminUserController.updateUserRole);


router.delete("/:userId", AdminUserController.deleteUser);

module.exports = router;