const UserServices = require('../services/userServices')
const response = require('../utility/response')


class UserController{
    async addUser(req, res){
        const data = await UserServices.addUser(req.body)
        res.status(201).json(response(true, "User Created", data))
    }
    async login(req, res){
        const {email, password} = req.body
        const data = await UserServices.login(email, password);
        res.status(200).json(response(true, "User logged in successfully", data))
    }
    async getMany(req, res){
        const {pageNo, noOfUsers} = req.query
        const data = await UserServices.getMany(parseInt(pageNo), parseInt(noOfUsers))
        res.status(200).json(response(true, "Users fetched successfully", data))
    }
    async deleteUser(req, res){
        const {id} = req.params;
        const data = await UserServices.deleteUser(id);
        res.status(200).json(response(true, "User deleted successfully", data))
    }
    async editUser(req, res){
        const {id} = req.params;
        const dataToInsert = req.body;
        const data = await UserServices.editUser(id, dataToInsert);
        res.status(201).json(response(true, "User editted successfully", data));
    }
}


module.exports = new UserController()