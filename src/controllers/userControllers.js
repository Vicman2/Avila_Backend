const {addUser, login, getMany, editUser, deleteUser, addToCart, changeProdQuant, emptyCart, deleteProdFromCart, emailSubscription, getAllSubscribers} = require('../services/userServices')
const response = require('../utility/response')


class UserController{
    async addUser(req, res){
        const data = await addUser(req.body)
        res.status(201).json(response(true, "User Created", data))
    }
    
    async login(req, res){
        const {email, password} = req.body
        const data = await login(email, password);
        res.status(200).json(response(true, "User logged in successfully", data))
    }

    async getMany(req, res){
        const {pageNo, noOfUsers} = req.query
        const data = await getMany(parseInt(pageNo), parseInt(noOfUsers))
        res.status(200).json(response(true, "Users fetched successfully", data))
    }

    async deleteUser(req, res){
        const {id} = req.params;
        const data = await deleteUser(id);
        res.status(200).json(response(true, "User deleted successfully", data))
    }

    async editUser(req, res){
        const {id} = req.params;
        const dataToInsert = req.body;
        const data = await editUser(id, dataToInsert);
        res.status(201).json(response(true, "User editted successfully", data));
    }


    //  Cart controller

    async addToCart(req, res){
        const prodId = req.params.id
        const userId = req.user.token.id
        const data = await addToCart(userId, prodId)
        res.status(201).json(response(true, "Product added to cart", data));
    }

    async incQuant(req, res){
        const prodId = req.params.id
        const userId = req.user.token.id
        const data = await changeProdQuant(prodId, userId, 'inc')
        res.status(200).json(response(true, "Product quantity increased", data));
    }
    async decQuant(req, res){
        const prodId = req.params.id
        const userId = req.user.token.id
        const data = await changeProdQuant(prodId, userId, 'dec')
        res.status(200).json(response(true, "Product quantity decreased", data));
    }
    async emptyCart(req, res){
        const userId = req.user.token.id;
        const data = await emptyCart(userId);
        res.status(200).json(response(true, "Cart emptied successfully", data));
    }
    async removeProd(req, res){
        const prodId = req.params.id
        const userId = req.user.token.id
        const data = await deleteProdFromCart(prodId, userId)
        res.status(200).json(response(true, "Product removed from cart", data));
    }

    async emailSub(req, res){
        const email = req.body.email
        const data = await emailSubscription(email);
        res.status(201).json(response(true, "Subscriber added successfully", data));
    }
    async getSubscribers(req, res){
        const {pageNo, noOfUsers} = req.query
        const data = await getAllSubscribers(parseInt(pageNo), parseInt(noOfUsers))
        res.status(200).json(response(true, "Subscribers fetched successfully", data));
    }
}


module.exports = new UserController()