// const express = require("express");
// const router = express.Router();
// const adminController = require("../controllers/admin/admin.controller");

// router.post("/login", adminController.adminLogin);

// module.exports = router;
const express = require("express")
const router = express.Router()
const { createUser, 
    getUsers, getOneUser, updateOne, deleteOne
} = require("../../controllers/user")
const multer = require("multer");
const upload = multer({ dest: 'uploads/' })


const { authenticateUser, isAdmin  } = require("../../middlewares/authorizedUser");