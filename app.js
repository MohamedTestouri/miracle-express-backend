// Import the Express and Mongoose modules
const express = require("express");
const mongoose = require("mongoose");

// Create an Express app
const app = express();

// Load environment variables
require("dotenv").config();

// Connect to MongoDB using the connection string from the environment variable DB
mongoose.connect(process.env.DB)
    .then(() => {
        console.log("Successfully connected to MongoDB.");
    });

// Import the router from the index.route file in the src/routes directory
const router = require("./src/routes/index.route");

// Use the router to handle API requests at the /api endpoint
app.use("/api", router);

// Return a 404 error for any other routes that were not defined
app.get('*', function (req, res) {
    return res.status(404).json({message: "404 Not Found"});
});

// Define a route for the /test endpoint and return a "Hello World" message
app.get("/test", (req, res) => {
    return res.status(200).json({message: "Hello World!"});
});

// Export the Express app
module.exports = app;
