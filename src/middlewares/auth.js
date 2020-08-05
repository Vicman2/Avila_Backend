const util = require('../utility/utilize');
const CustomError = require('../utility/CustomError')



exports.authentication =async(req, res, next)=>{
    const token = req.headers["x-access-token"];
    if(!token) throw new CustomError("Please, provide us with a token", 401);
    const decodedToken = await util.decodeToken(token)
    if(!decodedToken.success) return res.status(403).json(token)
    req.user = decodedToken
    console.log("Authenticate");
    next()
}

exports.authorize = async (req, res, next)=> {
    const role = req.user.token.role;
    if(role !== "admin") return res.status(403).json({success: false, message: "You are not an admin"})
    console.log("Authorize");
    next()
}