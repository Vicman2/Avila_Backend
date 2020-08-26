const mongoose = require('mongoose');

const Schema = mongoose.Schema

const UserModel = new Schema({
    name: {
        type: String,
        min:3,
        required: true
    }, 
    email:{
        type: String,
        unique: true,
        required:true
    }, 
    phone: {
        type: String, 
        required: true,
    }, 
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    address: {
        type: String, 
        required: false,
        default: ""
    },
    sex: {
        type: String,
        enum: ["male", "female"],
        required: true,
    },
    cart: [
        {
            product:  {
                type: Schema.Types.ObjectId, 
                ref:"product"
               },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ], 
    favourites: {
        type: [Schema.Types.ObjectId], 
        ref: "product"
    }
}, {timestamps:true})

module.exports = mongoose.model("User", UserModel)