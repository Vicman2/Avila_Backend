const express = require('express');
const router = express.Router();

const {addToCart, incQuant, decQuant, emptyCart, removeProd, getUserCart} = require('../controllers/userControllers');
const { validateId } = require('../middlewares/validators');
const { authentication } = require('../middlewares/auth');

router.get('/get', authentication, getUserCart)
router.post('/add/:id',authentication, validateId, addToCart)
router.put('/inc/:id', authentication, validateId, incQuant)
router.put('/dec/:id', authentication, validateId, decQuant)
router.put('/empty', authentication, emptyCart)
router.delete('/remove/:id', authentication, validateId, removeProd)



module.exports = router