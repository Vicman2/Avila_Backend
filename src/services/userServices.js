const bcrypt = require('bcryptjs')
const userModel = require('../models/userModel')
const productModel = require('../models/prductsModel')
const CustomError = require('../utility/CustomError')
const util = require('../utility/utilize')


class UserServices{
    async addUser(data){
        const existingUser =   await userModel.findOne({email: data.email})
        if(existingUser) throw new CustomError("Email already in use", 400)
        const hashedPassword = await bcrypt.hash(data.password, 12);
        data.password = hashedPassword;
        const toSave = new userModel(data);
        const saved = await toSave.save()
        const token = await util.generateToken({id: saved._id, role: saved.role})
        const dataToSend = {
            _id: saved._id,
            token: token,
            name:saved.name,
            email: saved.email,
            phone: saved.phone,
            role: saved.role,
            address: saved.address,
            sex: saved.sex
        }
        return dataToSend
    }
    async login(email, password){
        const  existing = await userModel.findOne({email})
        if(!existing) throw new CustomError("User do not exist", 400)
        const decryptedPassword = await bcrypt.compare(password, existing.password)
        if(!decryptedPassword) throw new CustomError("Access Denied", 401)
        const token = await util.generateToken({id: existing._id, role: existing.role})
        const dataToSend =   {
            id:existing._id,
            token: token,
            name: existing.name,
            email: existing.email, 
            phone: existing.phone,
            role: existing.role,
            cart: existing.cart,
            address: existing.address,
            sex: existing.sex
        }
        return dataToSend
    }
    async getMany(pageNumber, numberOfPersons){
        const numberToSkip = (pageNumber-1) * numberOfPersons
        const wanted = await userModel
                            .find()
                            .skip(numberToSkip)
                            .limit(numberOfPersons)
                            .sort([["createdAt", -1]])
                            .select("_id name email role phone cart address")
        let numberOfAll = await userModel.count()
        const dataToSend = {
            requestedUsers:wanted, 
            totalUsers: numberOfAll? numberOfAll : null
        }
        if(!numberOfAll|| numberOfAll == 0) throw new CustomError("No user in the platform", 400)
        return dataToSend
    }
    async deleteUser(userId){
        const userToBeDeleted = await userModel.findById(userId)
        if(!userToBeDeleted)  throw new CustomError("User do not exist", 400)
        const deletedUser = await userModel.findByIdAndDelete(userId);
        const {password, ...dataToSend} = deletedUser._doc
        return dataToSend;  
    }
    async editUser(userId, dataToInsert){
        const existing = await userModel.findOne({email: dataToInsert.email, _id: { $ne:userId } })
        if(existing) throw new CustomError("User with this email already exist", 400)
        const userToEdit = await userModel.findOne({_id:userId});
        if(!userToEdit) throw new CustomError("User do not exist", 400)
        if(dataToInsert.password){
            const hashedPassword = await bcrypt.hash(dataToInsert.password, 12);
            userToEdit.password = hashedPassword;
        }
        userToEdit.username = dataToInsert.username;
        userToEdit.name = dataToInsert.name;
        userToEdit.email = dataToInsert.email;
        userToEdit.role = dataToInsert.role;
        userToEdit.phone = dataToInsert.phone;
        userToEdit.address = dataToInsert.address
        const editedUser = await userToEdit.save();
        const {password, ...dataToSend} = editedUser._doc
        return dataToSend;  
    }


    //  Cart Services
    async addToCart(id, prodId){
        const existingBook = await productModel.findById({_id: prodId});
        if(!existingBook) throw new CustomError("Product do not exist", 401);
        const existingUser = await userModel.findById(id);
        if(!existingUser) throw new CustomError("User do not exist", 401);
        const cart = [...existingUser.cart]
        const isProductInCart = cart.find(product => product.product == prodId)
        if(!isProductInCart){
            cart.push({
                product: prodId,
                quantity:1
            });
        }else{
            throw new CustomError("Product is already in cart", 401)
        }
        existingUser.cart = cart;
        const updated = await existingUser.save();
        const {password, ...dataToSend} = updated._doc
        return dataToSend;
    }

    async emptyCart(id){
        const user = await userModel.findById(id);
        if(!user) throw new CustomError("User do not exist", 401);
        user.cart = []
        const updatedUser = await user.save();
        const {password, ...dataToSend} = updatedUser._doc
        return dataToSend;
    }

    async changeProdQuant(prodId, userId, action){
        const user = await userModel.findById(userId)
        if(!user) throw new CustomError("User do not exist", 401);   
        const cart = user.cart
        for(let i = 0; i < cart.length; i++){
            if(cart[i].product.toString() == prodId){
                action === "dec" ?cart[i].quantity-- : cart[i].quantity++
            }
        }
        user.cart = cart
        const updatedUser = await user.save();
        const {password, ...dataToSend} = updatedUser._doc
        return dataToSend;
    }
     async deleteProdFromCart(prodId, userId) {
        const user = await userModel.findById(userId)
        if(!user) throw new CustomError("User do not exist", 401);
        let prodIndexInCart;
        const prodToRemove = user.cart.find((prod,indexOfProd)=> {
            if(prod.product == prodId){
                prodIndexInCart = indexOfProd
                return prod
            }
        });
        
        if(!prodToRemove) throw new CustomError("Product  is not in cart", 401);
        user.cart.splice(prodIndexInCart,1)
        const updatedUser = await user.save();
        const {password, ...dataToSend} = updatedUser._doc
        return dataToSend;
    }
}

module.exports = new UserServices()