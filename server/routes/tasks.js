const express = require("express")
const router = express.Router()
const User = require('../models/User')

// add task
router.put("/saved/:username", function (req, res) {
    let task = req.body
    let username = req.params.username
    User.findOneAndUpdate({ username }, {
        "$push": {
            tasks: task
        }
    }, { new: true }, function (error, response) {
        res.send(response)
    })
})


// get task
router.get("/tasks/:username", function (req, res) {
    let username = req.params.username
    User.findOne({ username: username }, function (err, user) {
        res.send(user)
    })
})

// update Tesk 
// setting = done or important
router.put("/tasks/:username/:setting", function (req, res) {
    let task = req.body
    console.log(req.body);
    let { setting, username } = req.params
    User.findOneAndUpdate({ username }, {
        "$pull": { tasks: { _id: task._id } }
    }, { new: true }, function (err, response) {

    })
    task[setting] = !task[setting]
    console.log(task);
    User.findOneAndUpdate({ username }, {
        "$push": { tasks: task }
    }, { new: true }, function (err, response) {
        res.send(response)
    })
}) // test

module.exports = router