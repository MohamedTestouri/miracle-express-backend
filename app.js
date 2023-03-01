const express = require("express");
var app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");

const cors = require('cors');


// enable CORS for all routes
app.use(cors());

// connect to database
mongoose
  .connect("mongodb+srv://su-me:d3iqPNc9DWCQsu6B@miracleexpresscluster.f1fkmjy.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  });

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));

app.use(express.static("out"));
app.use("/doc", express.static("out"));

app.get("/hello", (req, res) => {
  return res.status(200).json({ message: "Hello World!" });
});

const router = require("./src/routes/index.route");
app.use("/api", router);

module.exports = app;
