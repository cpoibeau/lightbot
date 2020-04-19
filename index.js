const Discord = require('discord.js')
const Mongoose = require('mongoose')

const config = require('./config')
let client = new Discord.Client()

// Database connection
Mongoose.connect(config.dbConnect, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
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