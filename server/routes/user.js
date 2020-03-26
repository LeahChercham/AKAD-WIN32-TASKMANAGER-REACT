const express = require("express")
const router = express.Router()

const User = require('../models/User')
const bcrypt = require('bcrypt')
const saltRounds = 10

// Bcrypt = npm package that allows to encrypt passwords using hashing and salting
router.post("/user", function (req, res) {
    let password = req.body.password
    bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) { console.log(err) }
        req.body.password = hash
        let newUser = new User(req.body)
        newUser.save()
        res.end()
    })
})

// route to see if username already exists 
router.get("/user/:username", function (req, res) {
    let { username } = req.params
    User.findOne({ username }, function (error, response) {
        res.send(response)
    })
})


module.exports = router