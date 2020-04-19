const mongoose = require('mongoose')
const Schema = mongoose.Schema

const guildSchema = new Schema({
  guildID: { type: String, required: true },
  guildName: { type: String, required: true},
  prefix: { type: String, required: true },
  welcomeChannel: { type: String, required: true },
  welcomeMessage: { type: String, required: true }
}, { timestamps: true })

const Guild = mongoose.model('guilds', guildSchema)

module.exports = Guild