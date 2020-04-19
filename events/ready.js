let Guild = require('../models/guild.model')

module.exports = (client) => {
  Array.from(client.guilds.keys()).forEach( (el) => {
    let guild = client.guilds.get(el)

    Guild.findOneAndUpdate(
    { guildID: guild.id },
    { $setOnInsert: {
        guildID: guild.id,
        guildName: guild.name,
        prefix: 'lb-',
        welcomeChannel: '478174436466622465',
        welcomeMessage: 'Hello world !'
      } },
    { upsert: true, new: true },
    (err) => {
      if (err) console.error(err)
    })

  })

  client.user.setActivity(`Say lb-help for help !`, {
    url: 'https://discord.js.org',
    type: 'PLAYING'
  })
}