
const express = require('express');

const {getAllOrderofAllUser, getOrderDetailsForAdmin, updateOrderStatusForAdmin} = require('../../controllers/admin/order.controller')


const router = express.Router()

router.get('/get',getAllOrderofAllUser)
router.get('/details/:id',getOrderDetailsForAdmin)
router.put('/update/:id',updateOrderStatusForAdmin)


module.exports = router;
