const products = require("../models/products");
const dotenv = require("dotenv").config();

const getAllProducts = async (req, res) => {
    try {
      var p = await products.find();
      console.log(p)
      if (p.length>0) {
        res.status(200).json({
          message: "You have the following products !",
          status: true,
          data: p,
        });
        return;
      } else {
        res.status(200).json({
          message: "No products available !",
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

  module.exports = {
    getAllProducts
  };