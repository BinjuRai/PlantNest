// const mongoose = require("mongoose")
// const CONNECTION_STRING =process.env.MONGODB_URI

// const connectDB = async () => {
//     try{
//         await mongoose.connect(
//            CONNECTION_STRING,
//             {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true
//             }
//         )
//     }catch(err){
//         console.log("DB Err" , err)
//     }
// }
// module.exports = connectDB

// src/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit if DB connection fails
  }
};

module.exports = connectDB;
