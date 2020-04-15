const Discord = require('discord.js')
const Config = require('./config')

let client = new Discord.Client()
let config = new Config()

// Database connection
let db = config.sqlConnection()

db.connect((err) => {
  if(err) throw err
  console.log('Connection with batabase etablished !')
})

// Commands
client.commands = new Discord.Collection()

require('./utils/commandAdder')('./commands/', client.commands)

// Event manager
require('./utils/eventAdder')('./events/', client, db)

client.on('error', console.error)
client.on('warn', console.warn)
client.on('debug', (debug) => {
  if (debug.includes('Sending a heartbeat') || debug.includes(' Heartbeat acknowledged')) return
  console.debug(debug)
})

client.login(config.token)