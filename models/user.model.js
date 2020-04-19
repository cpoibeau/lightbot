const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  userID: { type: String, required: true },
  username: { type: String, required: true},
  guildID: { type: String, required: true },
  guildName: { type: String, required: true},
  balance: { type: Number, required: true },
  salary: { type: Number, required: true }
}, { timestamps: true })

const User = mongoose.model('users', userSchema)

module.exports = User