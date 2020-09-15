const joi = require('joi')
const CustomError = require('../utility/CustomError')


exports.validateSignUp = async(req, res, next) => {
    let deRole = req.user?  req.user.token.role : null
    let Schema = {
        name: joi.string().min(3).required(),
        email:joi.string().email().required(),
        phone: joi.string().min(10).required(),
        password:joi.string().required(),
        address: joi.string().required(), 
        sex: joi.string().required(),
    }
    if(deRole){
        Schema = {
            ...Schema, 
            role: joi.string().required(),
        }
    }
    const result = joi.validate(req.body, Schema)
    if(result.error)   throw new CustomError(result.error.message, 401);
    next();
}
exports.validateEmail = async (req, res, next)=>{
    const Schema = {
        email:joi.string().email().required(),
    }
    const result = joi.validate(req.body, Schema)
    if(result.error)   throw new CustomError(result.error.message, 401);
    next();
}


exports.validateLogin  = async(req, res, next)=>{
    const Schema = {
        email: joi.string().email().required(), 
        password: joi.string().required(),
    }
    const result = joi.validate(req.body, Schema)
    if(result.error)   throw new CustomError(result.error.message, 401);
    next()
}
exports.validateGetUsers= async(req, res, next)=> {
    const Schema = {
        pageNo : joi.number().required(),
        noOfUsers: joi.number().required()
    }
    const result = joi.validate(req.query, Schema)
    if(result.error)   throw new CustomError(result.error.message, 401);
    next()
}

exports.validateId = async(req, res, next)=> {
    const Schema = {
        id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }
    const result = joi.validate(req.params, Schema)
    if(result.error)   throw new CustomError(result.error.message, 401);
    next()
}

exports.validateEdittedUser = async(req, res, next) => {
    let deRole = req.user?  req.user.token.role : null
    let Schema = {
        name: joi.string().min(3).max(30).required(),
        email:joi.string().email().required(),
        phone: joi.string().min(10).required(),
        address: joi.string().required(),
        password: joi.optional()
    }
    if(deRole){
        Schema = {
            ...Schema, 
            role: joi.string().required(),
        }
    }
    const result = joi.validate(req.body, Schema)
    if(result.error)   throw new CustomError(result.error.message, 401);
    next()
}




// Product validators


exports.validProduct =(req, res, next)=> {
    let schema = {
        name: joi.string().min(3).required(),
        details: joi.string().min(10).required(),
        price: joi.number().required()
    }
    let valid = joi.validate(req.body, schema)
    if(valid.error) throw new CustomError(valid.error.message, 401)
    if(!req.file)  throw new CustomError("No image was uploaded", 401) 
    console.log("I am a valid product")
    next();
}
exports.validProductEdit =(req, res, next)=> {
    let schema = {
        name: joi.string().min(3).required(),
        details: joi.string().min(10).required(),
        prodImage: joi.string().optional()
    }
    let valid = joi.validate(req.body, schema)
    if (valid.error) throw new CustomError(valid.error.message, 401)
    if(!req.file & !req.body.prodImage) return res.status(401).send({success: false, message: "No image was uploaded"})
    next();
}


exports.validateGetProduct = async(req, res, next) => {
    const Schema = {
        pageNo : joi.number().required(),
        noOfProducts: joi.number().required()
    }
    const result = joi.validate(req.query, Schema)
    if(result.error) return res.status(401).json({success: false, message: result.error.message})
    next()
}