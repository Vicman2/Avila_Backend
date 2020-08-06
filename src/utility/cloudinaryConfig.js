const cloudinary = require('cloudinary').v2;
const config = require('../config/constants');
const { cloudinaryApiKey } = require('../config/constants');

const uploadToCloudinary = async(fileName, pathToFile)=>{
    cloudinary.config({
        cloud_name: config.cloudName, 
        api_key:cloudinaryApiKey ,
        api_secret: config.cloudinaryApiSecret,
    })
    const image =  await cloudinary.uploader.upload(pathToFile, {public_id: fileName, folder: 'products'})
    return image
}


module.exports = uploadToCloudinary