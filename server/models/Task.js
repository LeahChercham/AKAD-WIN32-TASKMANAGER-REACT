const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    done: Boolean,
    text: String,
    important: Boolean,
    date: Date,
    user: {type: Schema.Types.ObjectId, ref: 'User'}, // Referencing an User Object: the owner of the task
})

const Task = mongoose.model('task', TaskSchema)
module.exports = Task