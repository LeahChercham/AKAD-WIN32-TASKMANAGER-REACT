const express = require("express")
const router = express.Router()
const Task = require('../models/Task')
const User = require('../models/User')

// add task
router.put("/saved/:username", function (req, res) {
    let task = new Task(req.body)
    task.save()
    User.findOneAndUpdate({ username: req.params.username }, {
        "$push": {
            tasks: task
        }
    }, { new: true }, function (error, response) {
        res.send(response)
    })
})

// get task
router.get("/tasks/:username", async function (req, res) {
    let username = req.params.username
    User.findOne({ username }).populate({ path: 'tasks', model: Task }).exec((err, user) => {
        res.send(user)
    })
})

// update task
router.put("/tasks/:username/:setting", function (req, res) {
    let task = req.body
    let setting = req.params.setting
    task[setting] = !task[setting]
    Task.findOneAndUpdate({ _id: task._id },
        { [setting]: task[setting] },
        { new: true },
        function (err, response) {
            res.send(response)
        })
})

// delete Task
router.delete('/tasks/:username/:taskId', function (req, res) {
    Task.findOneAndDelete({ _id: req.params.taskId }, function (req, response) {
        res.send(response)
    })
})

module.exports = router