// Importing modules
const express = require("express");
// Importing Middleware
const authorizeJWT = require("../middleware/jwt");
const upload = require("../middleware/upload");
// Importing controllers and utilities
const {
generateCoupon,
verifyCoupon,
redeemCoupon,
getAllStaticCoupons
} = require("../controllers/sCoupon");

// Initializing router
const router = new express.Router();

router.post("/generate", generateCoupon);
router.post("/verify", verifyCoupon);
router.post("/redeem", redeemCoupon);
router.get("/getAllStatic", getAllStaticCoupons);
// Exporting Modules
module.exports = router;
