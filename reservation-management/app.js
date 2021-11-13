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
            title: 'Reservation System',
            description: 'REST endpoints for reservation System',
            servers: ["http://localhost:1111"]
        }
    },
    apis: ["./routes/reservations.js"]
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use("/swagger/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
const connection = mongoose.connection

connection.on('open', () => {
    console.log("Connecting to database...");
})

app.use(express.json())
const reservationsRouter = require('./routes/reservations')

app.use('/reservations', reservationsRouter)

var server = app.listen(1111, () => {
    axios({
        method: 'POST',
        url: 'http://localhost:7777/register',
        data: {
            apiName: "reservationsystem",
            host: "http://localhost",
            headers: {'Content-Type': 'application/json'},
            port: 1111,
            url: "http://localhost:1111/"}
    }).then((response) => {
        console.log(response.data)
    }).catch((err) => {console.log(err)})
    console.log('Local server started.')
})

module.exports = server