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
            title: 'Room Management',
            description: 'REST endpoints for room management',
            servers: ["http://localhost:5555"]
        }
    },
    apis: ["./routes/rooms.js"]
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use("/swagger/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

const connection = mongoose.connection

connection.on('open', () => {
    console.log("Connecting to database...");
})

app.use(express.json())
const roomsRouter = require('./routes/rooms')

app.use('/rooms', roomsRouter)

var server = app.listen(5555, () => {
    axios({
        method: 'POST',
        url: 'http://localhost:7777/register',
        data: {
            apiName: "roommanagement",
            host: "http://localhost",
            headers: {'Content-Type': 'application/json'},
            port: 5555,
            url: "http://localhost:5555/"}
    }).then((response) => {
        console.log(response.data)
    }).catch((err) => {console.log(err)})
    console.log('Local server started.')
})

module.exports = server