// Importing modules
const express = require("express");
// Importing Middleware
const authorizeJWT = require("../middleware/jwt");
const upload = require("../middleware/upload");
// Importing controllers and utilities
const {
  generateDCoupon,
  verifyDCoupon,
  redeemDCoupon,
  getAllDynamicCoupons,
  getCsv,
} = require("../controllers/dCoupon");

// Initializing router
const router = new express.Router();

router.post("/generate", generateDCoupon);
router.post("/verify", verifyDCoupon);
router.post("/redeem", redeemDCoupon);
router.get("/getAllDynamic", getAllDynamicCoupons);
router.post("/csv", getCsv);
// Exporting Modules
module.exports = router;
