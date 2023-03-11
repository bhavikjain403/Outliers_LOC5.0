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
var QRCode = require('qrcode');
var csv = require("csvtojson");
const fs = require("fs");

const generateDCoupon = async (req, res) => {
  try {
    var company = req.body.company_name
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

const   verifyDCoupon = async (req, res) => {
  try {
    let coupon = await DCoupon.findOne({ code: req.body.coupon_code, company_name: req.body.company_name});
    if (!coupon) {
      res.status(400).json({
        message: "Coupon not found",
        status: false,
        data: {}
      });
    } else if(coupon.user_list.includes(req.body.uid)==false || coupon.expired==true || Date.now()<coupon.expires_at) {
        res.status(400).json({
            message: "Coupon is not available for you",
            status: false,
            data: {}
        });
    } else if(coupon.user_list.includes(req.body.uid)==true) {
      res.status(200).json({
        message: "Coupon is available !!",
        status: true,
        data: {}
    });
    }
    else {
      res.status(400).json({
        message: "Coupon not applicable",
        status: false,
        data: {}
    });
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


const getAllDynamicCoupons = async (req, res) => {
  try {
    var company = req.query.company_name
    var coupons = await DCoupon.find({ company_name: company, expired: false });
    var user = req.query.uid
    var ans = []
    if (coupons.length>0) {
      for( var i=0;i<coupons.length;i++) {
        var temp=coupons[i].user_list
        if(temp.length){
          for(var i=0;i<temp.length;i++){
            if(temp[i]==user){
              ans.push(coupons[i])
              break
            }
          }
        }
      }
      console.log(ans)
      if (ans.length>0) {
        res.status(200).json({
          message: "You have the following coupons !",
          status: true,
          data: ans,
        });
      }
      else {
        res.status(400).json({
          message: "No coupons available !",
          status: false,
          data: {},
        });
      }
      return;
    } else {
      res.status(400).json({
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

const redeemDCoupon = async (req, res) => {
  try {

    let coupon = await DCoupon.findOne({ code: req.body.coupon_code, company_name: req.body.company_name});

    if (!coupon) {
      res.status(400).json({
        message: "Coupon not found ",
        status: false,
        data: {}
      });
    } else {
      var flag=0
      for(var i = 0; i < coupon.user_list.length; i++) {
        if ( coupon.user_list[i]==req.body.uid) {
          coupon.user_list.splice(i, 1);
          flag=1
          break
        }
      }
      if (flag==1) {
        coupon.redeem_count += 1
        coupon.markModified('user_list')
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


const getCsv = async (req, res) => {
  try {
    var file = await req.files.userdata.path;
    var j =await csv().fromFile(file)
    var emails = []
    for(var i=0;i<j.length;i++){
      emails.push(j[i]["Email"])
    }
    res.status(200).json({
      message: "Conversion success",
      status: true,
      data: emails
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
  generateDCoupon,
  sendCouponMail,
  verifyDCoupon,
  redeemDCoupon,
  getAllDynamicCoupons,
  getCsv
};
