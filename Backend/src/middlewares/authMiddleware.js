
// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");


// export const auth = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch {
//     return res.status(403).json({ message: "Invalid token" });
//   }
// };

// export const adminOnly = (req, res, next) => {
//   if (req.user.role !== "admin")
//     return res.status(403).json({ message: "Admins only" });
//   next();
// };

// // module.exports = (req, res, next) => {
// //   if (!req.user || req.user.role !== "admin")
// //     return res.status(403).json({ message: "Admin access denied" });

// //   next();

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admins only" });
  next();
};

module.exports = { auth, adminOnly };
