let Guild = require('../../models/guild.model')

module.exports = (msg, prefix, args) => {
  if (msg.content.slice(prefix.length + 'setWelcomeMessage '.length)){
    let welcomeMessage = msg.content.slice((prefix.length + 'settings setWelcomeMessage '.length)).replace('\'', '\\\'')
    
    Guild.update(
      { guildID: msg.guild.id},
      { welcomeMessage: welcomeMessage },
      (err) => {
        if (err) {
          console.log(err)
          msg.channel.send('Welcome message has not been updated :/')
          return
        }
        msg.channel.send(`Welcome message has been set to : ${welcomeMessage}`)
      }
    )

  } else {
    msg.channel.send(' You did not enter welcome message')
  }
}