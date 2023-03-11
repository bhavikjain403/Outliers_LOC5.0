// Importing modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const User = require("../models/user");
const { removeSensitiveData } = require("../utils/functions");

// JWT Authorization
const authorizeJWT = {
  verifyJWT: async (req, res, next) => {
    try {
      let token = req.header("Authorization").replace("Bearer ", "");
      let decoded = jwt.verify(token, process.env.JWT_SECRET);
      let user = await User.findOne({
        _id: decoded._id,
        "tokens.token": token,
      });

      if (!user) {
        res.status(401).json({
          message: "Please Authenticate!",
        });
        return;
      }
      
      req.user = user;
      req.token = token;

      next();
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  userTypeAdmin: async (req, res, next) => {
		try{
			if (req.user.type === 'ADMIN') {
				next();
			} else {
				res.status(403).json({
					message: 'Access Denied'
				});
			}
		} catch (e) {
			res.status(401).send({error: e.message});
		}
	},


};

// Exporting Module
module.exports = authorizeJWT;
