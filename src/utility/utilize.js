const jwt = require('jsonwebtoken')
const config = require('../config/constants')
const path = require('path')
const fs = require('fs')

exports.generateToken = async(data) => {
    const token = await jwt.sign(data, config.publicKey)
    return token
}

exports.decodeToken = async(token) => {
    try {
        const validToken  = await jwt.verify(token, config.publicKey);
        return {success: true, token: validToken}
    } catch (error) {
        return{success: false, message: "Invalid token", error: error}
    }
}

exports.deleteImage = async(filePath) => {
    fs.unlink(filePath, err => {
        if(err)  console.log(err, "This error is on deletion")
    })
}