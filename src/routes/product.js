const express = require('express');
const router = express.Router();

const {addProduct, getMany, getProduct, deleteProduct, editProduct} = require('../controllers/productController')
const { validProduct, validateGetProduct, validateId } = require('../middlewares/validators')
const {authentication, authorize} = require('../middlewares/auth')
const {machineImage} = require('../utility/multer')

router.post('/addProduct',authentication, authorize, machineImage.single('prodImage'), validProduct,  addProduct)
router.get('/getProducts',validateGetProduct, getMany)
router.get('/getProduct/:id',validateId, getProduct)
router.delete('/deleteProduct/:id', authentication, authorize, validateId, deleteProduct)
router.put('/editProduct/:id', authentication, authorize, machineImage.single('prodImage'), validProduct, editProduct)

module.exports = router