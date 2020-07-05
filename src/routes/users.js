const router = require('express').Router()
const UserContr = require('../controllers/userControllers')


router.get('/add', UserContr.addUser);

module.exports = router