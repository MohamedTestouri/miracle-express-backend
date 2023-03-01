const userModel = require("../models/user.model");
const User = userModel.User;

const getAllUsers = async function (req, res) {
  const user = await User.find().sort(User.createdAt).exec();
  return res.status(200).json(user);
};

const updateUser = (req, res) => {
  User.findOneAndUpdate({email: req.body.email}, req.body, (error, result) => {
    if (error) {
      return res.status(error.code).json(error);
    }
    return res.status(200).json(result);
  });
};

module.exports = { getAllUsers, updateUser };
