// Importing modules
const mongoose = require("mongoose");

// Creating the schema
const dynamicCouponSchema = new mongoose.Schema(
  {

    company_name:{
        type: String,
        required: true,
        trim: true,
    },

    user_list : {
      type: mongoose.Schema.Types.Array,
      required:true
    },

    region : {
      type: String,
      required:false
    },

    loyalty_pts : {
      type: Number,
      required:false
    },

    rules : {
      type: mongoose.Schema.Types.Map,
      required:true
    },

    min_cart_amt : {
      type: Number,
      required : false
    },

    max_cart_amt : {
      type: Number,
      required : false
    },

    discount: {
      type: Number,
      required:false
    },

    type: {
      type: String,
      enum: ["cashback", "free", "percent", "amount", "discount"]
    },

    product_categories : {
      type: mongoose.Schema.Types.Array,
      required:true
    },

    expired: {
      type: Boolean,
      requied:true
    },

    code: {
      type: String,
      unique:true,
      trim: true,
      minlength: [12, "Invalid Coupon!"],
      maxlength: [12, "Invalid Coupon!"],
    },

    redeem_count : {
      type: Number,
      default:0,
      trim: true,
    },

    created_at: {
      type: Date,
      trim: true,
    },

    expires_at: {
      type: Date,
      trim: true,
    },
    creator_email: {
      type: String,
      required: true,
      trim: true,
      // unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/,
        "Invalid email address!",
      ],
    },
  },
  { timestamps: true }
);


const DCoupon = mongoose.model("DCoupon", dynamicCouponSchema);

// Exporting the module
module.exports = DCoupon;
