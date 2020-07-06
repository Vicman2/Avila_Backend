const response = require('../utility/response')
const CustomError = require('../utility/CustomError')

module.exports = function(app){
    app.use((req, res, next) => {
        throw new CustomError("Invalid request", 400)
    })
    app.use((error, req, res, next) => {
       switch (true) {
            case error instanceof CustomError :
                res.status(error.status).json(response(false, error.message, null))
                break;
            case error.name == 'SyntaxError' :
                res.status(400).json(response(false, error.message, null))
                break;
            case error.name == 'JsonWebTokenError' :
                res.status(400).json(response(false, error.message, null))
                break;
            case error.name == 'CastError' :
                res.status(400).json(response(false, "Invalid ID", null))
                break;
            case error.name == 'ValidationError' :
                res.status(400).json(response(false, error.message, null))
                break;
           default:
               res.status(500).json(response(false, error.message, null))
               break;
       }
    })
}