// Importing modules
const SCoupon = require("../models/static_coupon");
const bcryptjs = require("bcryptjs");
const {removeSensitiveData} = require("../utils/functions");
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

  const company = req.body.company
  company = company.substring(0,3)

  try {
    const code = voucher_codes.generate({
        pattern: `ICO-${company}-####`,
    });

    let coupon = await SCoupon.findOne({ code: req.body.coupon_code });
    if (coupon) {
      res.status(400).json({
        message: "Coupon Already Exists!",
        status:false,
        data: {
          coupon: coupon,
        },
      });
      return;
    }else{
      req.body['code'] = code[0]
      let newCoupon = new SCoupon(req.body);
      await newCoupon.save();
      res.status(400).json({
        message: "Coupon Created Successfully !",
        status:true,
        data: {
          coupon: coupon,
        },
      });
    }


  }
  catch(err) {
    res.status(400).json({
      message: err.message,
      status: false
    });
  }
}

const verifyCoupon = async (req, res) => {
  try {
    let coupon = await SCoupon.findOne({ code: req.body.coupon_code });

    if(coupon.redeem_count < coupon.max_count && Date.now() < coupon.expires_at && !coupon.expired){
      res.status(200).json({
        message: "Verifiied ! ",
        status: true
      });
    }
  }
  catch(err) {
    res.status(400).json({
      message: err.message,
      status: false,
      data : {}
    });
  }
}


const sendCouponMail = async (req, res) => {
  try {

    let code = req.body['code']
    let listcoupons = req.body['coupons'];

    let img = await QRCode.toDataURL(code);

    for(i = 0; i<listcoupons.length;i++){
      const emailSuccess = await sendEmail({
        subject: `Your Coupon Code is : `,
        emailId: listcoupons[i],
        filename: "coupon",
        fileOptions: {
          name: "",
          image_url: img,
          email:listcoupons[i]
        },
      });
      console.log(emailSuccess);
    }



    res.status(200).json({
        message: "Coupon mailed successfully",
        status: true,
        data:{}
      });
  }
  catch(err) {
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
verifyCoupon
};
