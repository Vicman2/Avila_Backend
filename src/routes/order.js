const express = require('express');
const router = express.Router();

const {makeOrder, removeOrder} = require('../controllers/orderController')
const {authentication, authorize} = require('../middlewares/auth')
const { validateId } = require('../middlewares/validators')


router.post('/make',authentication, makeOrder)
router.delete('/remove/:id', authentication, validateId,removeOrder )



module.exports = router;