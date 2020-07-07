const express = require('express')
const router = express.Router();
const userRoutes = require('./users')
const productRoutes = require('./product')
const cartRoutes =require('./cart')

router.use('/product_img',express.static('../public/product_img') )
router.use('/users',userRoutes)
router.use('/products',productRoutes )
router.use('/cart', cartRoutes)


module.exports = router