const Discord = require('discord.js')
const Config = require('./config')
const fs = require('fs')

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

fs.readdir('./commands/', (err, items) => {
  if (err) console.error(err)
  
  items.forEach( (file) => {
    name = file.split('.')[0]
    client.commands.set(name.toLowerCase(), require('./commands/' + name))
  })
})

// Event manager
client.on('ready', () => require('./events/ready')(client, db))
client.on('message', (msg) => require('./events/message')(client, msg, db))
client.on('guildMemberAdd', (guildMember) => require('./events/addGuildMember')(guildMember))

client.on('error', console.error)
client.on('warn', console.warn)
client.on('debug', console.debug)

client.login(config.token)