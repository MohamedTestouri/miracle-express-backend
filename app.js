// Import the Express framework
const express = require("express");

// Create a new Express application
const app = express();

// Define a new route for the "/hello" endpoint using HTTP GET
app.get("/hello", (req, res) => {
    // Return a JSON response with a message "Hello World!" and HTTP status code 200
    return res.status(200).json({ message: "Hello World!" });
});

// Export the Express application as a module
module.exports = app;
