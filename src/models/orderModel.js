const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderModel = new Schema({
    user: {
        required:true,
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    userOrders:[
        {
            product:{
                type:Schema.Types.ObjectId,
                required: true,
                ref:'product'
            }, 
            status:{
                type:String,
                enum:['processing', 'completed'],
                default:'processing'
            }, 
            orderDate: {
                type:Date,
                default: Date.now
            }
        }
    ]
}, {timestamps: true})

module.exports = mongoose.model('Order', orderModel)