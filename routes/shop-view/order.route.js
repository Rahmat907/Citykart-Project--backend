
const express = require('express');

const {createOrder, capturePayment, getAllOrderbyUser, getOrderDetails} = require('../../controllers/shop/Order.controller.js')


const router = express.Router()

router.post('/create', createOrder);
router.post('/capture', capturePayment);
router.get('/list/:userId', getAllOrderbyUser)
router.get('/details/:id', getOrderDetails)

module.exports = router;
