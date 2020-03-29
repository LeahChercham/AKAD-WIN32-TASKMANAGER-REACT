const express = require("express")
const router = express.Router()
const User = require('../models/xUser')

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
    console.log(task);
    let { setting, username } = req.params
    User.findOneAndUpdate({ username }, {
        "$pull": { tasks: { _id: task._id } }
    }, { new: true }, function (err, response) {
    }).then(() => {
        task[setting] = !task[setting]
        console.log(task)
        User.findOneAndUpdate({ username }, {
            "$push": { tasks: task }
        }, { new: true }, function (err, response) {
            console.log(response);
            res.send(response)
        })
    })
})


router.delete('/tasks/:username', function (req, res) {
    let task = req.body
    console.log(task);
    let username = req.params.username
    console.log(username);
    User.findOneAndUpdate({ username: username }, {
        "$pull": { tasks: { _id: task._id } }
    }, { new: true }, function (err, response) {
        console.log(response);
        res.send(response)
    })
})

module.exports = router