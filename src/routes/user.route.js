const express = require("express");
const { checkSchema } = require("express-validator");
const { validate } = require("../middlewares/validate.schema");
const { user } = require("../models/user.model");
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.patch("/update", userController.updateUser);

router.post(
  "/auth/register",
  validate(checkSchema(user)),
  authController.register
);
router.post("/auth/login", authController.login);
router.patch("/auth/activate", authController.activateAccount);

module.exports = router;
