const bcrypt = require('bcryptjs')
const userModel = require('../models/userModel')
const CustomError = require('../utility/CustomError')
const util = require('../utility/utilize')
const constants = require('../config/constants')


class UserServices{
    async addUser(data){
        const existingUser =   await userModel.findOne({email: data.email})
        if(existingUser) throw new CustomError("Email already in use", 400)
        const hashedPassword = await bcrypt.hash(data.password, 12);
        data.password = hashedPassword;
        const toSave = new userModel(data);
        const saved = await toSave.save()
        const token = await util.generateToken({id: saved._id, role: saved.role})
        const dataToSend = {token: token,name:saved.name, email: saved.email,role: saved.role}
        return dataToSend
    }
    async login(email, password){
        const  existing = await userModel.findOne({email})
        if(!existing) throw new CustomError("User do not exist", 400)
        const decryptedPassword = await bcrypt.compare(password, existing.password)
        if(!decryptedPassword) throw new CustomError("Access Denied", 401)
        const token = await util.generateToken({id: existing._id, role: existing.role})
        const dataToSend =   {
            token: token,
            name: existing.name,
            email: existing.email, 
            role: existing.role
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
        let numberOfAll = await userModel.count()
        const data = {
            requestedUsers:wanted, 
            totalUsers: numberOfAll? numberOfAll : null
        }
        if(!numberOfAll|| numberOfAll == 0) throw new CustomError("No user in the platform")
        const dataToSend =  {success: true, message: "Users fetched successfully", data: data}
        return dataToSend
    }
    async deleteUser(userId){
        const userToBeDeleted = await userModel.findById(userId)
        if(!userToBeDeleted)  throw new CustomError("User do not exist", 400)
        const deletedUser = await userModel.findByIdAndDelete(userId);
        return {success: true, message: "User have been deleted successfully", userData: deletedUser}
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
        const editedUser = await userToEdit.save();
        const dataToSend =  {success: true, message: "User have been edited successfully", data: editedUser}
        return dataToSend
    }
}

module.exports = new UserServices()