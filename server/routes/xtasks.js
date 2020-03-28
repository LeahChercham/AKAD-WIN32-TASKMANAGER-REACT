const express = require("express")
const router = express.Router()
const User = require('../models/User')
const Task = require('../models/Task')

// add task
router.put("/saved/:username", function (req, res) {
    let task = new Task(req.body)
    task.save()
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
    User.findOne({ username }).populate('taskss').exec((err, user) => {
        console.log(user);
        res.send(user)
    })
})

// router.put("/tasks/:username/:setting", function(req,res){
//     let task = req.body
//     let setting = req.params.setting
//     task[setting] =!task[setting]
//     Task.findOneAndUpdate({_id: task._id}, {[setting]: task[setting]}, {new:true}, function(err,response){
//         res.send(response)
//     })
// })


router.put('/tasks/:username/:setting', function (req, res) {
    let { username, setting } = req.params
    let task = req.body
    task.important = !task.important
    Task.findOneAndUpdate({ _id: task._id }, {
        "$set": {
            important: task.important,
        }
    }, { new: true }, (err, response) => {
        res.send(response)
    })
})

// update Tesk 
// setting = done or important
// router.put("/tasks/:username/:setting", function (req, res) {
//     let task = req.body
//     console.log(task);
//     let { setting, username } = req.params
//     User.findOneAndUpdate({ username }, {
//         "$pull": { tasks: { _id: task._id } }
//     }, { new: true }, function (err, response) {
//     }).then(() => {
//         task[setting] = !task[setting]
//         console.log(task)
//         User.findOneAndUpdate({ username }, {
//             "$push": { tasks: task }
//         }, { new: true }, function (err, response) {
//             console.log(response);
//             res.send(response)
//         })
//     })
// })


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