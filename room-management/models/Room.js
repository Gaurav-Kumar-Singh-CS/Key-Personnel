const mongoose = require('mongoose')

mongoose.model("room", {
    roomType: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    totalRooms: {
        type: Number,
        required: true
    }
})