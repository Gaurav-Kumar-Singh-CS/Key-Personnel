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
            title: 'Staff Management',
            description: 'REST endpoints for staff management',
            servers: ["http://localhost:3333"]
        }
    },
    apis: ["./routes/employees.js"]
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use("/swagger/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

const connection = mongoose.connection

connection.on('open', () => {
    console.log("Connecting to database...");
})

app.use(express.json())
const employeesRouter = require('./routes/employees')

app.use('/employees', employeesRouter)

app.listen(3333, () => {
    axios({
        method: 'POST',
        url: 'http://localhost:7777/register',
        data: {
            apiName: "staffmanagement",
            host: "http://localhost",
            headers: {'Content-Type': 'application/json'},
            port: 3333,
            url: "http://localhost:3333/"}
    }).then((response) => {
        console.log(response.data)
    }).catch((err) => {console.log(err)})
    console.log('Local server started.')
})