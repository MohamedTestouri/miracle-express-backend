const userModel = require("../models/user.model");
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const sendmail = require("../utils/sendmail");
const User = userModel.User;
require("dotenv").config();

const login = async (req, res) => {
    User.find({email: req.body.email}, (error, user) => {
        if (error) return res.status(error.code).json(error);
        if (user.length > 0) {
            const verified = bcrypt.compareSync(req.body.password, user[0].password);
            if (verified) {
                if (user[0].isActive) return res.status(200).json(user[0]); else return res.status(401).json({"message": "not active"});
            } else {
                return res.status(404).json({"message": "incorrect password"});
            }

        }
    });
};
const register = async (req, res) => {
    const user = new User(req.body);
    user._id = new mongoose.Types.ObjectId();
    const activationCode = Math.floor(Math.random() * (999999 - 100001)) + 100000;
    user.resetCode = activationCode;
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: req.body.email,
        subject: '[Miracle Express] - Activate your account',
        text: 'Activation code : ' + activationCode
    }
    User.exists({email: req.body.email}, (error, result) => {
        if (error) return res.status(error.code).json(error);
        if (!result) {
            user.save().then(data => {
                console.log(data);
                // must send mail here !
               // sendmail(mailOptions);
                return res.status(201).json(data);
            }).catch(err => {
                console.log(err);
                return res.status(err.code).json(err);
            });
        } else {
            console.log("User Exists", result);
            return res.status(404).json(result);
        }

    });
}
const activateAccount = (req, res) => {
  User.find({ email: req.body.email }, (error, user) => {
    if (error) return res.status(error.code).json(error);
    console.log(user);
    if (user.length > 0) {
      if (user[0].resetCode === req.body.code) {
        User.findOneAndUpdate(
          { email: req.body.email },
          { $set: { isActive: true } },
          (error, result) => {
            if (error) {
              return res.status(error.code).json(error);
            }
            return res.status(200).json(result);
          }
        );
      }
    } else {
      return res.status(404).json(user);
    }
  });
};

module.exports = {register, login, activateAccount};
