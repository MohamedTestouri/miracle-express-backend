const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const lastIndex = file.originalname.lastIndexOf(".");
    cb(
      null,
      file.originalname.slice(0, lastIndex) +
        "-" +
        Date.now() +
        file.originalname.slice(lastIndex)
    );
  },
});

const upload = multer({ storage: storage }); // allow upload max 5 files

const uploadImages = (req, res) => {
  if (req.files == null) {
    return res.status(500).json({ error: "Please select one image to upload" });
  }
  return res.status(200).send(req.files);
};

module.exports = { upload, uploadImages };
