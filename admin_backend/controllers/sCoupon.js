// Importing modules
const SCoupon = require("../models/static_coupon");
const bcryptjs = require("bcryptjs");
const { removeSensitiveData } = require("../utils/functions");
const jwt = require("jsonwebtoken");
const voucher_codes = require('voucher-code-generator')
const dotenv = require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const { sendEmail, generateotp } = require("../utils/email");
const axios = require("axios");
var QRCode = require('qrcode')


const generateCoupon = async (req, res) => {
  try {
    var company = req.body.company_name
    company = company.substring(0, 3)
    var code = req.body.coupon
    let coupon = await SCoupon.findOne({ code: req.body.coupon_code });
    if (coupon) {
      res.status(400).json({
        message: "Coupon Already Exists!",
        status: false,
        data: {
          coupon: coupon,
        },
      });
      return;
    } else {
      var temp = req.body
      temp['code'] = code[0]

      let newCoupon = new SCoupon(temp);
      await newCoupon.save();
      res.status(200).json({
        message: "Coupon Created Successfully !",
        status: true,
        data: {
          coupon: newCoupon,
        },
      });
    }


  }
  catch (err) {
    res.status(400).json({
      message: err.message,
      status: false
    });
  }
}

const verifyCoupon = async (req, res) => {
  try {

    let coupon = await SCoupon.findOne({ code: req.body.coupon_code });

    if (!coupon) {
      res.status(400).json({
        message: "Coupon not found ",
        status: false,
        data: {}
      });
    } else {
      if (coupon.redeem_count < coupon.max_count && Date.now() < coupon.expires_at && !coupon.expired) {
        if (coupon.product_categories.includes(req.body.category)) {
          // User can use coupon only 5 times
          if (req.body.uid in coupon.users) {
            if (coupon.users[req.body.uid] > 5) {
              res.status(400).json({
                message: "Already redeemed 5 times",
                status: false,
                data: {}
              });
            } else {
              coupon.verify_count += 1
              coupon.save();
              res.status(200).json({
                message: "Verifiied ! ",
                status: true
              });
            }
          } else {
            coupon.verify_count += 1
            coupon.users[req.body.uid] = 0
            coupon.markModified('users')
            coupon.save();

            res.status(200).json({
              message: "Verifiied ! ",
              status: true
            });
          }


        } else {
          res.status(400).json({
            message: "Wrong Product Category !! ",
            status: false,
            data: {}
          });
        }


      } else {
        res.status(400).json({
          message: "Coupon Expired or Used already !! ",
          status: false,
          data: {}
        });
      }
    }


  }
  catch (err) {
    res.status(400).json({
      message: err.message,
      status: false,
      data: {}
    });
  }
}


const getAllStaticCoupons = async (req, res) => {
  try {
    var company = req.query.company_name
    var coupons = await SCoupon.find({ company_name: company, expired: false });
    console.log(coupons)
    if (coupons.length>0) {
      res.status(200).json({
        message: "You have the following coupons !",
        status: true,
        data: coupons,
      });
      return;
    } else {
      res.status(200).json({
        message: "No coupons available !",
        status: false,
        data: {},
      });
    }
  }
  catch (err) {
    res.status(400).json({
      message: err.message,
      status: false
    });
  }
}

const redeemCoupon = async (req, res) => {
  try {

    let coupon = await SCoupon.findOne({ code: req.body.coupon_code });

    if (!coupon) {
      res.status(400).json({
        message: "Coupon not found ",
        status: false,
        data: {}
      });
    } else {
      if (req.body.uid in coupon.users) {

        coupon.redeem_count += 1
        coupon.markModified('users')
        coupon.users[req.body.uid] += 1
        coupon.save()

        res.status(200).json({
          message: "Redeemed Successfully !!",
          status: true,
          data: {}
        });
      } else {
        res.status(400).json({
          message: "Coupon not verified !! ",
          status: false,
          data: {}
        });
      }
    }


  }
  catch (err) {
    res.status(400).json({
      message: err.message,
      status: false,
      data: {}
    });
  }
}


const sendCouponMail = async (req, res) => {
  try {

    let code = req.body['code']
    let listcoupons = req.body['coupons'];

    let img = await QRCode.toDataURL(code);

    for (i = 0; i < listcoupons.length; i++) {
      const emailSuccess = await sendEmail({
        subject: `Your Coupon Code is : `,
        emailId: listcoupons[i],
        filename: "coupon",
        fileOptions: {
          name: "",
          image_url: img,
          email: listcoupons[i]
        },
      });
      console.log(emailSuccess);
    }



    res.status(200).json({
      message: "Coupon mailed successfully",
      status: true,
      data: {}
    });
  }
  catch (err) {
    res.status(400).json({
      message: err.message,
      status: false
    });
  }
}


// Exporting modules
module.exports = {
  generateCoupon,
  sendCouponMail,
  verifyCoupon,
  redeemCoupon,
  getAllStaticCoupons
};
