// Importing modules
const mongoose = require("mongoose");

// Creating the schema
const staticCouponSchema = new mongoose.Schema(
  {

    company_name:{
        type: String,
        required: true,
        trim: true,
    },

    creator_email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/,
        "Invalid email address!",
      ],
    },


    type: {
      type: String,
      trim: true,
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
      required:true
    },

    max_count:{
      type:Number,
      required:true
    },

    created_at: {
      type: Date,
      trim: true,
    },

    expires_at: {
      type: Date,
      trim: true,
    },

    creator: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
  },
  { timestamps: true }
);


const SCoupon = mongoose.model("SCoupon", staticCouponSchema);

// Exporting the module
module.exports = SCoupon;
