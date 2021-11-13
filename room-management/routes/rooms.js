const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

require("../models/Room")
const Room = mongoose.model("room")

router.get('/', async(req, res) => {
    try
    {
        const rooms = await Room.find()
        res.json(rooms)
    }
catch(err)
    {
        res.send('Error: ' + err)
    }
})


router.get('/:id', async(req, res) => {
    try
        {
            const rooms = await Room.findById(req.params.id)
            res.json(rooms)
        }
    catch(err)
        {
            res.send('Error: ' + err)
        }
})


router.post('/', async(req, res) => {
    const room = new Room({
        roomType: req.body.roomType,
        cost: req.body.cost,
        totalRooms: req.body.totalRooms
    })
    try
    {
       const roomRecord = await room.save()
       res.json(roomRecord)
    }
    catch(err)
    {
        res.send("Error")
    }
})


router.put('/:id', (req, res) => {
    try
    {
        const room = Room.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, doc)=> {
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
            Room.findByIdAndRemove(req.params.id, (err, doc)=> {})
            res.send("Record deleted")
    }
    catch(err)
    {
        console.log(err)
    }
})

module.exports = router