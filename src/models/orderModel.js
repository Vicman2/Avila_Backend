const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderModel = new Schema({
    user: {
        required:true,
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    orders:[
        {
            product:{
                type:Schema.Types.ObjectId,
                required: true,
                ref:'product'
            },
        }
    ],
    status:{
        type:String,
        enum:['processing', 'delivered'],
        default:'processing'
    },
    totalPrice: {
        type: Number, 
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Order', orderModel)