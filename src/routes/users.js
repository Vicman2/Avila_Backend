const router = require('express').Router()
const {addUser, login, getMany, deleteUser, editUser}= require('../controllers/userControllers')
const {authentication, authorize} = require('../middlewares/auth')
const {validateSignUp, validateLogin, validateGetUsers, validateId, validateEdittedUser} = require('../middlewares/validators')


router.post('/create',validateSignUp, addUser);
router.get('/login', validateLogin, login)
router.get('/many',authentication, authorize, validateGetUsers, getMany)
router.delete('/delete/:id', authentication, authorize, validateId, deleteUser)
router.put('/edit/:id',authentication,  authorize, validateId, validateEdittedUser, editUser)


module.exports = router