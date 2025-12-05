
require("dotenv").config();
const http = require("http");

const app = require("./index");
const cors = require('cors');

const PORT = process.env.PORT || 5050;

// Create HTTP server
const server = http.createServer(app);


app.set("connectedUsers", connectedUsers);

// // This line is **redundant** — you already attached this route in index.js:
// const lessonRoutes = require('./routes/admin/lessonContentRoute');
// app.use('/api/admin/lesson', lessonRoutes);  // <-- REMOVE this from here to avoid double registration

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
