const express = require('express')
const app = express()

require('./startup/middlewares')(app)
const config = require('./config/constants')
// require('./startup/database')()


const port  = config.port
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})