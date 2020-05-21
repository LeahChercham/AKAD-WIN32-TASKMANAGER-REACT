const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Jeder Task soll wie dieses Schema aussehen
const TaskSchema = new Schema({
    done: Boolean,
    text: String,
    important: Boolean,
    date: Date,
    user: {type: Schema.Types.ObjectId, ref: 'User'}, // Hier wird dem Task ein Benutzer zugewiesen.
})

const Task = mongoose.model('task', TaskSchema) // Erstellung eines Modells für das Task-Schema
module.exports = Task