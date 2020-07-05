const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)
require('express-async-errors')

require('./src/startup/middlewares')(app)
const config = require('./src/config/constants')
const database = require('./src/startup/database')
const errorMiddleware = require('./src/middlewares/errorHandler')
const apiRoutes = require('./src/routes')


//endPoint
app.use('/api', apiRoutes)

//Initial home route
app.use('/', (req, res)=> {
    res.status(200).sendFile(express.static('./public/index.html'))
})

// Error Middleware
errorMiddleware(app)

const port  = config.port
server.listen(port, () => {
    database()
    console.log(`Listening on port ${port}`)
})

server.on('error', error => {
    console.log(`Error occured on the server ${error}`)
})

module.exports = app