let Guild = require('../models/guild.model')

module.exports = (client, msg) => {
  if (msg.author.bot || !msg.guild) return

  Guild.findOne(
    { guildID: msg.guild.id },
    (err, doc) => {
      if (err) console.error(err)
      let prefix
      if (doc) {
        prefix = doc.prefix
      } else {
        prefix = 'lb-'
      } 

      if (!msg.content.startsWith(prefix)) return

      console.log(`${msg.author.tag} used : '${msg.content}' on ${msg.guild}`)
      const args = msg.content.split(/ +/g)
      reg = new RegExp(prefix + '(\\S+)')
      const cmd = args.shift().toLowerCase().match(reg)[1]

      if (!client.commands.has(cmd)) return
      if (typeof client.commands.get(cmd) === 'object') {
        if (!args[0]) return
        if (!client.commands.get(cmd).has(args[0].toLowerCase())) return
        
        client.commands.get(cmd).get(args[0].toLowerCase())(msg, prefix, args)

      } else {
        client.commands.get(cmd)(client, msg, prefix, args)
      }
    }
  )
}