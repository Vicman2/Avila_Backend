const userServices = require('../services/userServices')
const response = require('../utility/response')


class UserController{
    async addUser(req, res){
        res.status(200).send(response(true, "Setting up my template", null))
    }
}


module.exports = new UserController()