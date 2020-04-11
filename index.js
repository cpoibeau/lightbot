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

require('./misc/fileBrowser')('./commands/', client.commands)
require('./misc/fileBrowser')('./commands/settings/', client.settings)

// Event manager
client.on('ready', () => require('./events/ready')(client, db))
client.on('message', (msg) => require('./events/message')(client, msg, db))
client.on('guildMemberAdd', (guildMember) => require('./events/addGuildMember')(guildMember))

client.on('error', console.error)
client.on('warn', console.warn)
client.on('debug', console.debug)

client.login(config.token)