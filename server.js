const http = require("http"); // Import the built-in Node.js http module
const app = require("./app"); // Import the Express application from the local module "app"
const port = process.env.PORT || 3000; // Set the port for the server to listen on, using either the environment variable "PORT" or a default of 3000
const server = http.createServer(app); // Create a new server using the http module and pass in the Express application as a request handler
server.listen(Number(port), () => console.log(`Server running on port ${port}`)); // Start the server by listening on the specified port and log a message to the console when the server starts
