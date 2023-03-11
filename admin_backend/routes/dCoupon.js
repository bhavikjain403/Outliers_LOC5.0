// Importing modules
const express = require("express");
// Importing Middleware
const authorizeJWT = require("../middleware/jwt");
const upload = require("../middleware/upload");
// Importing controllers and utilities
const {
generateCoupon
} = require("../controllers/sCoupon");

// Initializing router
const router = new express.Router();

router.post("/generate", generateCoupon);
// Exporting Modules
module.exports = router;
