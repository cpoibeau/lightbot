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
client.settings = new Discord.Collection()
client.bank = new Discord.Collection()
client.music = new Discord.Collection()

require('./utils/commandAdder')('./commands/', client.commands)
require('./utils/commandAdder')('./commands/settings/', client.settings)
require('./utils/commandAdder')('./commands/bank/', client.bank)
require('./utils/commandAdder')('./commands/music/', client.music)

// Event manager
require('./utils/eventAdder')('./events/', client, db)

client.on('error', console.error)
client.on('warn', console.warn)
client.on('debug', (debug) => {
  if (debug.includes('Sending a heartbeat') || debug.includes(' Heartbeat acknowledged')) return
  console.debug(debug)
})

client.login(config.token)