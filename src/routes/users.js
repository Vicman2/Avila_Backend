const router = require('express').Router()
const {addUser, login, getMany, deleteUser, editUser, emailSub, getSubscribers, getUser, addToFavourite, removeFromFavourite, getFavourites}= require('../controllers/userControllers')
const {authentication, authorize} = require('../middlewares/auth')
const {validateSignUp, validateLogin, validateGetUsers, validateId, validateEdittedUser, validateEmail} = require('../middlewares/validators');


router.post('/create',validateSignUp, addUser);
router.post('/login', validateLogin, login)
router.get('/many',authentication, authorize, validateGetUsers, getMany)
router.get('/getUser', authentication, getUser)
router.delete('/delete/:id', authentication, authorize, validateId, deleteUser)
router.put('/edit/:id',authentication, validateId, validateEdittedUser, editUser)


// Email Subscribers

router.post('/subscribe', validateEmail, emailSub)
router.get('/getSubscribers', authentication, authorize,validateGetUsers, getSubscribers)

// Favourites

router.put('/addFavourite/:id', authentication, addToFavourite)
router.delete('/removeFavourite/:id', authentication, removeFromFavourite)
router.get('/getFavourites', authentication, getFavourites)



module.exports = router