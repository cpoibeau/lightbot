let Guild = require('../../models/guild.model')

module.exports = (msg, prefix, args) => {
  let regex = /([!:;,%_-]{1,2})|([\w\d]{1,4}-)/i
  console.log(args)

  if(args[1].match(regex)){
    prefix = args[1]

    Guild.update(
      { guildID: msg.guild.id},
      { prefix: prefix },
      (err) => {
        if (err) {
          console.log(err)
          msg.channel.send('Bot prefix has not been changed :/')
          return
        }
        msg.channel.send(`Bot prefix has been set to : ${prefix}`)
      }
    )
  }
}