// Importing modules
const mongoose = require("mongoose");

// Creating the schema
const staticCouponSchema = new mongoose.Schema(
  {

    company_name: {
      type: String,
      required: true,
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

    type: {
      type: String,
      enum: ["percent", "amount"]
    },

    discount: {
      type: Number
    },

    product_categories: {
      type: mongoose.Schema.Types.Array,
      required: true
    },

    users: {
      type: {},
      required: true
    },

    expired: {
      type: Boolean,
      required: true
    },

    code: {
      type: String,
      unique: true,
      trim: true,
      minlength: [12, "Invalid Coupon!"],
      maxlength: [12, "Invalid Coupon!"],
    },

    verify_count: {
      type: Number,
      required: true
    },

    max_count: {
      type: Number,
      required: true
    },

    expires_at: {
      type: Date,
      required: true,
    },

  },
  { timestamps: true }
);


const SCoupon = mongoose.model("SCoupon", staticCouponSchema, "scoupons");

// Exporting the module
module.exports = SCoupon;
