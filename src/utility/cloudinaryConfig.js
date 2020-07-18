const cloudinary = require('cloudinary');
const config = require('../config/constants');
const { cloudinaryApiKey } = require('../config/constants');
const CustomError = require('./CustomError');

const uploadToCloudinary = async(fileName, path)=>{
    cloudinary.config({
        cloud_name: config.cloudName, 
        api_key:cloudinaryApiKey ,
        api_secret: config.cloudinaryApiSecret,
    })
    const image =  await cloudinary.uploader.upload(path, {public_id: fileName})
    return image
}


module.exports = uploadToCloudinary