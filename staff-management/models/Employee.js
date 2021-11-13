const mongoose = require('mongoose')

mongoose.model("employee", {
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pin: {
            type: String,
            required: true
        }
    }
})