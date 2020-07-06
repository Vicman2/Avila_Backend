const joi = require('joi')


exports.validateSignUp = async(req, res, next) => {
    const Schema = {
        name: joi.string().min(3).required(),
        email:joi.string().email().required(),
        password:joi.string().required()
    }
    const result = joi.validate(req.body, Schema)
    if(result.error) return res.status(401).json({success: false,message: result.error.message})
    next();
}


exports.validateLogin  = async(req, res, next)=>{
    const Schema = {
        email: joi.string().email().required(), 
        password: joi.string().required(),
    }
    const result = joi.validate(req.body, Schema)
    if(result.error) return res.status(401).json({success: false, message: result.error.message})
    next()
}
exports.validateGetUsers= async(req, res, next)=> {
    console.log(req.query)
    const Schema = {
        pageNo : joi.number().required(),
        noOfUsers: joi.number().required()
    }
    const result = joi.validate(req.query, Schema)
    if(result.error) return res.status(401).json({success: false, message: result.error.message})
    next()
}

exports.validateId = async(req, res, next)=> {
    const Schema = {
        id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }
    const result = joi.validate(req.params, Schema)
    if(result.error) return res.status(401).json({success: false, message: result.error.message})
    next()
}

exports.validateEdittedUser = async(req, res, next) => {
    const Schema = {
        name: joi.string().min(3).max(30).required(),
        email:joi.string().email().required(),
        role: joi.string().allow(["user", "admin"]).required(),
        password: joi.optional()
    }
    const result = joi.validate(req.body, Schema)
    if(result.error) return res.status(401).json({success: false,message: result.error.message})
    next()
}