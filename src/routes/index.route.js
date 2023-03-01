const express = require("express");
const router = express.Router();

const userRoute = require("./user.route");
const productRoute = require("./product.route");
const uploadRoute = require("./upload.route");

router.use("/user", userRoute);
router.use("/product", productRoute);
router.use("/upload", uploadRoute);

module.exports = router;
