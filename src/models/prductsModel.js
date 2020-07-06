const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const product = new Schema({
    name : {
        required: true, 
        min: 3,
        type: String
    },
    prodImageSrc:{
        type: String, 
        required: true
    }, 
    details: {
        type: String, 
        required: true
    }, 
    price: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports  = mongoose.model("product", product);