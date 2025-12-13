
const express = require("express");
const { serachProducts } = require("../../controllers/shop/search.controllers.js");
const router = express.Router();


router.get("/:keyword", serachProducts);

module.exports = router;