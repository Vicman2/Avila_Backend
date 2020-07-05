
const cors = require('cors')
const helmet = require('helmet')
const express = require('express')

module.exports = function(app){
    app.use(cors())
    app.use(helmet())
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(express.static('../'))
}