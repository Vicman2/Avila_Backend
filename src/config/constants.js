const dotEnv = require('dotenv')
const dotEnvFound = dotEnv.config();

if(!dotEnvFound) throw new Error("Could not find dotEnv file")

module.exports = {
    port: process.env.PORT,
    databaseURI : process.env.databaseURI, 
    publicKey: process.env.public_key, 
    cloudinaryApiKey : process.env.CLOUDINARY_API_KEY, 
    cloudinaryApiSecret : process.env.CLOUDINARY_API_SECRET, 
    cloudName: process.env.CLOUD_NAME
}