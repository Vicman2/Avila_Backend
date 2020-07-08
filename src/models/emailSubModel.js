const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const email_subscriber = new Schema({
    email : {
        required: true, 
        min: 6,
        type: String
    }
}, {timestamps: true});

module.exports  = mongoose.model("subscribers", email_subscriber);