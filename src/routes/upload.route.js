const express = require("express");
const router = express.Router();
const {
  uploadMultiple,
  uploadMultipleImages,
} = require("../middlewares/upload.multiple.image");
router.post("/upload", uploadMultiple, uploadMultipleImages);

module.exports = router;
