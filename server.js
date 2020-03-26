const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const PORT = 4000
const api = require('./server/routes/api')

const app = express()

mongoose.connect('mongodb://localhost:27017/TasksManagerDB', { useNewUrlParser: true }, () => console.log("Connected to DB"))

// Necessary to parse the JSON from requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname, "dist")))
app.use(express.static(path.join(__dirname, "node_modules")))
app.use("/", api)

app.listen(PORT, function(){ console.log('Server running on port: ' + PORT)})
