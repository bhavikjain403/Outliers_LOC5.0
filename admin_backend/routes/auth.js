// Importing modules
const express = require("express");
// Importing Middleware
const authorizeJWT = require("../middleware/jwt");
const upload = require("../middleware/upload");
// Importing controllers and utilities
const {
  signup,
  login,
  logout,
} = require("../controllers/auth");

// Initializing router
const router = new express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/logout", authorizeJWT.verifyJWT, logout);
// Exporting Modules
module.exports = router;
