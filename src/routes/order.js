const express = require('express');
const router = express.Router();

const {makeOrder, removeOrder, getOrder, getOrders, editOrder, getOrderProds} = require('../controllers/orderController')
const {authentication, authorize} = require('../middlewares/auth')
const { validateId } = require('../middlewares/validators')


router.post('/make',authentication, makeOrder)
router.delete('/remove/:id', authentication, validateId,removeOrder )
router.get('/get/:id', authentication,validateId,getOrder)
router.get('/get', authentication, getOrders)
router.put('/edit/:id', authentication, authorize, editOrder)
router.get('/getProds', authentication, getOrderProds)



module.exports = router;