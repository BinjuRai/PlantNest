
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   
    req.user = {
      id: decoded._id,
      _id: decoded._id, 
      email: decoded.email,
      name: decoded.name,
      role: decoded.role,
    };

   

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};


const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }
};

module.exports = { authenticate, isAdmin };