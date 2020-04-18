const Discord = require('discord.js')
const Config = require('./config')
const Mongoose = require('mongoose')

let client = new Discord.Client()
let config = new Config()

// Database connection
Mongoose.connect('mongodb://localhost:27017/lightbot', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
const connection = Mongoose.connection

connection.once('open', () => [
    console.log('MongoDB database connection etablished successfully')
])

// Commands
client.commands = new Discord.Collection()

require('./utils/commandAdder')('./commands/', client.commands)

// Event manager
require('./utils/eventAdder')('./events/', client)

client.on('error', console.error)
client.on('warn', console.warn)
client.on('debug', (debug) => {
  if (debug.includes('Sending a heartbeat') || debug.includes(' Heartbeat acknowledged')) return
  console.debug(debug)
})

client.login(config.token)