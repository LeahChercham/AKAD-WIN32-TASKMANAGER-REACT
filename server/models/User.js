const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: String,
    password: String, // The password will not be the real password, but the encryption of the password.
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    taken: Boolean,
})


const User = mongoose.model('user', UserSchema)
module.exports = User