const mongoose = require('mongoose')
const axios = require('axios')

const reservationSchema = new mongoose.Schema({
    guestID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    roomID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    numberOfAdults: {
        type: Number,
        required: true
    },
    numberOfChildren: {
        type: Number,
        required: true
    },
    totalCost: {
        type: Number,
        required: false,
        default: 0
    }
})
/*
reservationSchema.pre('save', function(next){
        var date1 = new Date(this.checkIn);
        var date2 = new Date(this.checkOut);
        var diff = Math.abs(date1.getTime() - date2.getTime());
        var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        console.log(diffDays)
        var roomCost
        var totalRoomCost 
        axios.get("http://localhost:5555/rooms/" + this.roomID).then((response) => {
                console.log(response)
                roomCost = response.data.cost;
                console.log("room cost is " + roomCost)
                totalRoomCost = (this.numberOfAdults + this.numberOfChildren) * response.data.cost * diffDays
                this.totalCost = totalRoomCost
            })
            //this.totalCost = (this.numberOfAdults + this.numberOfChildren) * roomCost * diffDays
            console.log(this.totalCost)
            next()
})*/
const Reservation = mongoose.model('reservation', reservationSchema)

module.exports = Reservation