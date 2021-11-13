const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const axios = require('axios')
const Reservation = require("../models/Reservation")

router.get('/', async(req, res) => {
    try
    {
        const reservations = await Reservation.find()
        res.json(reservations)
    }
catch(err)
    {
        res.send('Error: ' + err)
    }
})


router.get('/:id', async(req, res) => {
    try
        {   
            var guestDetails = null
            const reservations = await Reservation.findById(req.params.id)
            await axios.get("http://localhost:4444/guests/" + reservations.guestID).then((response) => {
                console.log(response)
                guestDetails = response.data;
             })
            //res.json(reservations)
            res.send({guest: guestDetails, reservation: reservations})
        }
    catch(err)
        {
            res.status(404).send('Error: ' + err)
        }
})

router.get('/name/:name', async(req, res) => {
    try
        { 
            const reservations = await Reservation.find({numberOfAdults: req.params.name}, function (err, reservation) {
                console.log(reservation[0]._id.toString())
                res.json(reservation);
            }).clone().catch(function(err){ console.log(err)})
        }
    catch(err)
        {
            res.status(404).send('Error: ' + err)
        }
})


router.post('/', async(req, res) => {
    const {
        numberOfChildren,
        numberOfAdults,
        roomID,
        checkIn,
        checkOut,
      } = req.body;
        var date1 = new Date(checkIn);
        var date2 = new Date(checkOut);
        var diff = Math.abs(date1.getTime() - date2.getTime());
        var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        var roomCost = 0
        await axios.get("http://localhost:5555/rooms/" + roomID).then((response) => {
        console.log(response)
        roomCost = response.data.cost
        })
        const totalRoomCost = (numberOfAdults + numberOfChildren) * roomCost * diffDays
    
        const reservation = new Reservation({
        guestID: mongoose.Types.ObjectId(req.body.guestID),
        roomID: mongoose.Types.ObjectId(req.body.roomID),
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        numberOfAdults: req.body.numberOfAdults,
        numberOfChildren: req.body.numberOfChildren,
        totalCost: totalRoomCost
    })
    try
    {
        const reservationRecord = await reservation.save()
        res.json(reservationRecord)
    }
    catch(err)
    {
        console.log(err)
        res.send("Error")
    }
})


router.put('/:id', async(req, res) => {
    const {
        numberOfChildren,
        numberOfAdults,
        roomID,
        checkIn,
        checkOut,
      } = req.body;
        var date1 = new Date(checkIn);
        var date2 = new Date(checkOut);
        var diff = Math.abs(date1.getTime() - date2.getTime());
        var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        var roomCost = 0
        await axios.get("http://localhost:5555/rooms/" + roomID).then((response) => {
        console.log(response)
        roomCost = response.data.cost
        })
        const totalRoomCost = (numberOfAdults + numberOfChildren) * roomCost * diffDays
        req.body.totalCost = totalRoomCost

    try
    {
        const reservation = Reservation.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, doc)=> {
            if(err)
            console.log("Error in put" + err)
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
            Reservation.findByIdAndRemove(req.params.id, (err, doc)=> {})
            res.send("Record deleted")
    }
    catch(err)
    {
        console.log(err)
    }
})

module.exports = router