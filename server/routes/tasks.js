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
    console.log(username);
    User.findOne({ username: username }, function (err, user) {
        console.log(user.tasks);
        res.send(user)
    })
})

module.exports = router