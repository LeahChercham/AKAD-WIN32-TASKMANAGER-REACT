const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    done: Boolean,
    text: String,
    important: Boolean,
    date: Date,
})

const Task = mongoose.model('task', TaskSchema)
module.exports = Task