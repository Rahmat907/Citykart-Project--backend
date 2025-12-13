const express = require("express");

const {
  getFilteredProduct,
  getProductDetail
} = require("../../controllers/shop/product.controller");

const router = express.Router();
 
router.get("/get", getFilteredProduct);
router.get("/get/:id", getProductDetail);
module.exports = router;
