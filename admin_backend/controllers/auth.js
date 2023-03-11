// Importing modules
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { removeSensitiveData } = require("../utils/functions");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const { sendEmail, generateotp } = require("../utils/email");
const axios = require("axios");

// const testTwilio = (req, res) => {
//   try {
//     client.messages
//       .create({body: 'Hi there', from: '+15134576207', to: '++919167403295'})
//       .then(message => console.log(message.sid));
//   } catch (error) {
//     console.log(error);
//   }
// }


// Signup
const signup = async (req, res) => {
  try {

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).json({
        message: "User Already Exists!",
        data: {
          user: user,
        },
      });
      return;
    }

    let newUser = new User({
      ...req.body,


    });
    await newUser.save();
    const token = await User.generatejwt(newUser._id);

    newUser = removeSensitiveData(newUser);
    // Sending a response back
    res.status(201).json({
      message: "User Signed Up",
      data: {
        token,
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(404).json({
        status: false,
        data: {},
        message: "User not found!",
      });
      return;
    }

    const isMatch = await bcryptjs.compare(req.body.password, user.password);

    if (!isMatch) {
      res.status(401).json({
        status: false,
        data: {},
        message: "Invalid credentials!",

      });
      return;
    }

    const token = await User.generatejwt(user._id);

    user = removeSensitiveData(user);

    res.status(200).json({
      status: false,
      data: {
        token,
        user
      },
      message: "User Verified!",

    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      status: false,
      data: {

      },
    });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    const currentUser = req.user;
    const token = req.token;

    currentUser.tokens = currentUser.tokens.filter((usertoken) => {
      return usertoken.token !== token;
    });

    await currentUser.save();

    res.status(200).json({
      message: "Successfully logged out!",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};






// Exporting modules
module.exports = {
  signup,
  login,
  logout,
};
