const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

require("../models/Guest")
const Guest = mongoose.model("guest")


/**
 * @swagger
 * /guests:
 *  get:
 *      parameters: []
 *      description: Get the details of a guest by their id
 *      responses:
 *          '200':
 *              description: A successful response with the guest details
 */
router.get('/', async(req, res) => {
    try
    {
        const guests = await Guest.find()
        res.json(guests)
    }
catch(err)
    {
        res.send('Error: ' + err)
    }
})

/**
 * @swagger
 * /guests/{id}:
 *  get:
 *      parameters: [{
        name: id,
        in: path,
        required: true,
        description: "A single guest id"
      }]
 *      description: Get the details of a guest by their id
 *      responses:
 *          '200':
 *              description: A successful response with the guest details
 */
router.get('/:id', async(req, res) => {
    try
        {
            const guests = await Guest.findById(req.params.id)
            res.json(guests)
        }
    catch(err)
        {
            res.status(404).send('Error: ' + err)
        }
})

router.get('/name/:name', async(req, res) => {
    try
        { 
            const guests = await Guest.find({name: req.params.name}, function (err, guest) {
                console.log(guest[0]._id.toString())
                res.json(guest);
            }).clone().catch(function(err){ console.log(err)})
        }
    catch(err)
        {
            res.status(404).send('Error: ' + err)
        }
})

/**
 * @swagger
 * /guests:
 *  post:
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '../models#/Guest'
 *      description: Post the details of a guest
 *      responses:
 *          '200':
 *              description: A successful response with the guest details
 */
router.post('/', async(req, res) => {
    const guest = new Guest({
        name: req.body.name,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
    })
    try
    {
       const guestRecord = await guest.save()
       res.json(guestRecord)
    }
    catch(err)
    {
        res.send("Error")
    }
})


router.put('/:id', (req, res) => {
    try
    {
        const guest = Guest.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, doc)=> {
            if(err)
            console.log("Error in put")
        }) 
        res.send("Record updated")
    }
    catch(err) 
    {
        console.log(err)
        res.send("Error")
    }
})


router.delete('/:id', (req, res) => {
    try
    {
            Guest.findByIdAndRemove(req.params.id, (err, doc)=> {})
            res.send("Record deleted")
    }
    catch(err)
    {
        console.log(err)
    }
})

module.exports = router