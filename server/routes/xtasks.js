const express = require("express")
const router = express.Router()
const Task = require('../models/Task')
const User = require('../models/xUser')

// add task
router.put("/saved/:username", function (req, res) {
    console.log(req.body);
    // {important, done, text, date, user(_id)}
    let task = new Task(req.body)
    console.log(task);
    // {_id, important, done, text, date, user(_id)}
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
router.get("/tasks/:username", async function (req, res) {
    let username = req.params.username
    User.findOne({ username }).populate('Task').exec((err, user) => {
        console.log(user.tasks[0]);
        res.send(user)
    })
    // let user = await User.findOne({username})
    // await user.populate('taskss').execPopulate()
    // user.populated('taskss')
    // console.log(user.tasks[0])
})

router.put("/tasks/:username/done", function (req, res) {
    let task = req.body
    Task.findOneAndUpdate({ _id: task._id }, { done: !task.done }, { new: true }, function (err, response) {
        res.send(response)
    })
})

// // router.put("/tasks/:username/:setting", function(req,res){
// //     let task = req.body
// //     let setting = req.params.setting
// //     task[setting] =!task[setting]
// //     Task.findOneAndUpdate({_id: task._id}, {[setting]: task[setting]}, {new:true}, function(err,response){
// //         res.send(response)
// //     })
// // })




// router.put('/tasks/:username/:setting', function (req, res) {
//     let { username, setting } = req.params
//     let task = req.body
//     console.log(task.important);
//     task.important = !task.important
//     console.log(task.important);
//     Task.findOneAndUpdate({ _id: task._id }, {
//             important: task.important,
//         }
//     , { new: true }, (err, response) => {
//         console.log(response.important);
//         res.send(response)
//     })
// })

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