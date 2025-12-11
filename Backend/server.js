require("dotenv").config();

const http = require("http");
const app = require("./index");

const PORT = process.env.PORT || 5050;

// Create HTTP server
const server = http.createServer(app);

// Start server
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
``
