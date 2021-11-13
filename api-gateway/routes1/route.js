const express = require('express')
const axios = require('axios')
const registry = require('./registry.json')
const fs = require('fs')
const router = express.Router()

router.all('/:apiName/:path', async(req, res) => {
    console.log(req.params.path)
    console.log(req.method)
    console.log(req.headers)
    console.log(req.body)
    if(registry.services[req.params.apiName]) {
        await axios({
        method: req.method,
        url: registry.services[req.params.apiName].url + req.params.path,
        data: req.body
    }).then((response) => {
        console.log(response.data)
        res.send(response.data)
    }).catch((err) => {console.log(err)})
}else
    res.send("API name doesn't exist.")
})

router.all('/:apiName/:path/:id', async(req, res) => {
    console.log(req.params.path)
    console.log(req.method)
    console.log(req.headers)
    console.log(req.body)
    if(registry.services[req.params.apiName]) {
        await axios({
        method: req.method,
        url: registry.services[req.params.apiName].url + req.params.path + "/" + req.params.id,
        data: req.body
    }).then((response) => {
        console.log(response.data)
        res.send(response.data)
    }).catch((err) => {console.log(err)})
}else
    res.send("API name doesn't exist.")
})

router.post('/register', (req, res) => {
    const registrationInfo = req.body
    registry.services[registrationInfo.apiName] = { ...registrationInfo}
    fs.writeFile('./routes1/registry.json', JSON.stringify(registry), (error) => {
        if(error) {
            res.send("The service was not registered.")
        }else
        res.send("Service registered successfully.")
    })
})

module.exports = router