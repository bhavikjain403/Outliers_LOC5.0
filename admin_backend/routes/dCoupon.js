// Importing modules
const express = require("express");
// Importing Middleware
const authorizeJWT = require("../middleware/jwt");
const upload = require("../middleware/upload");
// Importing controllers and utilities
const {
generateDCoupon,
sendCouponMail,
verifyDCoupon,
redeemDCoupon,
getAllDynamicCoupons
} = require("../controllers/dCoupon");

// Initializing router
const router = new express.Router();

router.post("/generate", generateDCoupon);
router.post("/verify", verifyDCoupon);
router.post("/redeem", redeemDCoupon);
router.get("/getAllDynamic", getAllDynamicCoupons);
router.post("/sendmail", sendCouponMail);
// Exporting Modules
module.exports = router;
