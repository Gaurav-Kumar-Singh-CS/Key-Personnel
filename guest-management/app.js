const express = require('express')
require("dotenv").config();
const connectDB = require("./db")
const mongoose = require('mongoose')
const axios = require('axios')

connectDB();

const app = express()

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Guest Management',
            description: 'REST endpoints for guest management',
            servers: ["http://localhost:4444"]
        }
    },
    apis: ["./routes/guests.js"]
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use("/swagger/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

const connection = mongoose.connection

connection.on('open', () => {
    console.log("Connecting to database...");
})

app.use(express.json())
const guestsRouter = require('./routes/guests')

app.use('/guests', guestsRouter)

var server = app.listen(4444, () => {
    axios({
        method: 'POST',
        url: 'http://localhost:7777/register',
        data: {
            apiName: "guestmanagement",
            host: "http://localhost",
            headers: {'Content-Type': 'application/json'},
            port: 4444,
            url: "http://localhost:4444/"}
    }).then((response) => {
        console.log(response.data)
    }).catch((err) => {console.log(err)})
    console.log('Local server started.')
})

module.exports = server