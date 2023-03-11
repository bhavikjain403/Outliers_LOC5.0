// Importing modules
const DCoupon = require("../models/dynamic_coupon");
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
var csv = require("csvtojson");


const getCsv = async (req, res) => {
  try {
    var file = await req.body.userdata
    csv().fromStream(file).subscribe(function(jsonObj){ //single json object will be emitted for each csv line
     // parse each json asynchronousely
     return new Promise(function(resolve,reject){
         asyncStoreToDb(json,function(){resolve()})
     })
  }) 
    company = company.substring(0, 3)
    const code = voucher_codes.generate({
      pattern: `ICO-${company}-####`,
    });
    let coupon = await DCoupon.findOne({ code: req.body.coupon_code });
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
      let newCoupon = new DCoupon(temp);
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


// Exporting modules
module.exports = {
  getCsv
};
