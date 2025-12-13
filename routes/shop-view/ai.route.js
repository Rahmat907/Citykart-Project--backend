
const express = require('express');
const router = express.Router();

const { askQuestion} = require('../../controllers/shop/askAI.controller.js')


router.post('/askai', askQuestion)

module.exports = router;