const express = require("express");

const {
  addtoCart,
  updateCartItems,
  fetchCartItems,
  deleteCartItems,
} = require("../../controllers/shop/cart.controller");

const router = express.Router();

router.post("/add", addtoCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItems);
router.delete("/:userId/:productId", deleteCartItems);

module.exports = router;
