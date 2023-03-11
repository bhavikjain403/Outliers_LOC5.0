// Importing modules
const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");
const ejs = require("ejs");
let path = require('path')

// Sending OTP via mail
const sendEmail = async ({
  subject,
  message,
  emailId,
  filename,
  fileOptions,
}) => {
  try {

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });

    let mailOptions = {};
    if (message) {
      mailOptions = {
        from: '"Incento" <developer.ojask@gmail.com>',
        to: emailId,
        subject,
        text: message,
        attachDataUrls: true
      };
    } else {
      let reqPath = path.join(__dirname, '../views', filename + '.ejs');
      const data = await ejs.renderFile(
        reqPath,
        fileOptions
      );

      mailOptions = {
        from: '"Incento" <developer.ojask@gmail.com>',
        to: emailId,
        subject,
        html: data,
        attachDataUrls: true
      };
    }

    transporter.sendMail(mailOptions, function (error, data) {
      if (error) {
        console.log("Error " + error);


      } else {
        console.log("Email sent successfully");

      }
    });

    return true;
  } catch (error) {
    console.log(error)
    return false;
  }
};

// Generating an OTP
const generateotp = (otpLength) => {
  let digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otpLength; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

// Exporting modules
module.exports = {
  sendEmail,
  generateotp
};
