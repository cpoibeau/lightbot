const Discord = require('discord.js')
const Connection = require('./config/connection')

let client = new Discord.Client()
let connection = new Connection()

let db = connection.sqlConnection()

//Database connection
db.connect((err) => {
  if(err) throw err
  console.log('Connection with batabase etablished !')
})

// Ready + liste des seveurs
client.on('ready', () => {
  console.log('Ready !')
  Array.from(client.guilds.keys()).forEach((element) => {
    let guild = client.guilds.get(element)
    let parsed_date = guild.createdAt.toJSON().replace('T', ' ').split('.')[0]
    
    db.query(`INSERT INTO guilds (discord_id, name, creation_date) VALUES 
      ('${guild.id}', '${guild.name}', '${parsed_date}') 
      ON DUPLICATE KEY UPDATE name='${guild.name}', last_connexion=NOW();`)
  })

  client.user.setActivity(`Say lb-help for help !`, {
    url: 'https://discord.js.org',
    type: 'PLAYING'
  })
})

function adminCheckFromMsg(msg){
  let member2Check = msg.guild.members.get(msg.author.id)
  return member2Check.hasPermission('MANAGE_CHANNELS') || member2Check.hasPermission('MANAGE_GUILD')
}

// Commands
client.on('message', (msg) => {
  if (!msg.author.bot) {

    //prefix selection
    db.query(`SELECT prefix FROM guilds WHERE discord_id='${msg.guild.id}'`, (err, result) => {
      if (err) throw err
      if (result){
        let prefix = result[0].prefix

        const args = msg.content.split(/ +/g)
        console.log(args)
        const cmd = args.shift().toLowerCase()

        if (cmd === prefix + 'ping'){
            msg.channel.send('Test ok')
        }
      }
    })
  }
})

// Welcome message
client.on('guildMemberAdd', (member) => {
  member.send(`Welcome on ${member.guild.name}, ${member.user.username} !`)
  db.query(`SELECT welcomeChannel FROM guilds WHERE discord_id='${member.guild.id}'`, (err, result) => {
    if (err) throw err
    if (result){
      member.guild.channels.get(result[0].welcomeChannel).send(`Welcome on our server ${member} !`)
    }
  })
})

client.on('error', console.error)
client.on('warn', console.warn)
client.on('debug', console.debug)

client.login(connection.token)