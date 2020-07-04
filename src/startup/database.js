const mongoose = require('mongoose')
const config = require('../config/constants')


module.exports = function (){
    mongoose.connect(config.databaseURI, { useNewUrlParser: true , useUnifiedTopology: true})
        .then(() => {
            console.log("Connected to mongoDb")
        })
        .catch(err => {
            console.log("There was an error while connecting to the database.")
        })
}