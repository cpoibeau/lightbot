let Guild = require('../models/guild.model')

module.exports = (client, member) => {
  member.send(`Welcome on ${member.guild.name}, ${member.user.username} !`)
  
  Guild.findOne(
    { guildID: member.guild.id },
    (err, doc) => {
      if (err) {
        console.error(err)
        return
      }
      if (doc.welcomeChannel){
        welcomeChannel = member.guild.channels.get(doc.welcomeChannel)

        if (doc.welcomeMessage) {
          welcomeChannel.send(member + ' ' + doc.welcomeMessage)
        } else {
          welcomeChannel.send(`Welcome on our server ${member} !`)
        }
      }
    }
  )
}