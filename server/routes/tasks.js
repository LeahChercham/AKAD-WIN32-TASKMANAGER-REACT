const express = require("express")
const router = express.Router()
const User = require('../models/User')
const Task = require('../models/Task')

router.put("/saved/:username", function (req, res) {
    let task = new Task(req.body)
    task.save()
    let { username } = req.params
    User.findOneAndUpdate({ username }, {
        "$push": {
            tasks: task
        }
    }, { new: true }, function (error, response) {
        res.send(response)
    })
}) // works

router.get("/tasks/:username", function (req, res) {
    let { username } = req.params
    console.log(username);
    User.findOne({ username }, function(err,user){
        user.populate('tasks', function(){
            console.log(user.tasks);
            res.send(user)
        })
    })
//     User.findOne({ username })
//         .populate('tasks')
//         .exec((err, response) => {
//             console.log(response);
//             res.send(response)
//         })
})

module.exports = router