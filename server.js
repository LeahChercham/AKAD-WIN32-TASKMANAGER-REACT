const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const PORT = 4000
const path = require('path')

const user = require('./server/routes/user')
const tasks = require('./server/routes/tasks')

const app = express()

app.use(express.static(path.join(__dirname, "build")))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})

// Necessary to parse the JSON from requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TasksManagerDB', { useNewUrlParser: true }, () => console.log("Connected to DB"))

app.use("/", user)
app.use("/", tasks)


//This is a "catch-all" route handler, essentially saying that if your server did not register any of the other routes, it will send the index.html file from your build. 
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || PORT, function(){ console.log('Server running on port: ' + PORT)})
