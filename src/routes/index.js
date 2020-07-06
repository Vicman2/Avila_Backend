const express = require('express')
const router = express.Router();
const userRoutes = require('./users')
const productRoutes = require('./product')

router.use('/product_img',express.static('../public/product_img') )
router.use('/users',userRoutes)
router.use('/products',productRoutes )


module.exports = router