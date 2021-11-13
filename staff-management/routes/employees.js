const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

require("../models/Employee")
const Employee = mongoose.model("employee")

router.get('/', async(req, res) => {
    try
    {
        const employees = await Employee.find()
        res.json(employees)
    }
catch(err)
    {
        res.send('Error: ' + err)
    }
})


router.get('/:id', async(req, res) => {
    try
        {
            const employees = await Employee.findById(req.params.id)
            res.json(employees)
        }
    catch(err)
        {
            res.status(404).send('Error: ' + err)
        }
})

router.get('/name/:name', async(req, res) => {
    try
        { 
            const employees = await Employee.find({name: req.params.name}, function (err, employee) {
                console.log(employee[0]._id.toString())
                res.json(employee);
            }).clone().catch(function(err){ console.log(err)})
        }
    catch(err)
        {
            res.status(404).send('Error: ' + err)
        }
})

router.post('/', async(req, res) => {
    const employee = new Employee({
        name: req.body.name,
        gender: req.body.gender,
        salary: req.body.salary,
        jobTitle: req.body.jobTitle,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
    })
    try
    {
       const employeeRecord = await employee.save()
       res.json(employeeRecord)
    }
    catch(err)
    {
        res.send("Error")
    }
})


router.put('/:id', (req, res) => {
    try
    {
        const employee = Employee.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, doc)=> {
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
            Employee.findByIdAndRemove(req.params.id, (err, doc)=> {})
            res.send("Record deleted")
    }
    catch(err)
    {
        console.log(err)
    }
})

module.exports = router