let Guild = require('../../models/guild.model')

module.exports = (msg, prefix, args) => {
  if(msg.content.split(' ')[2]){
    let welcomeChannel = msg.guild.channels.find('name', msg.content.split(' ')[2])
  
    if(welcomeChannel){
      Guild.update(
        { guildID: msg.guild.id},
        { welcomeChannel: welcomeChannel.id },
        (err) => {
          if (err) {
            console.log(err)
            msg.channel.send('Welcome messages channel has not been updated :/')
            return
          }
          msg.channel.send(`Welcome messages channel has been set to : ${welcomeChannel.name}`)          }
      )
    } else {
      msg.channel.send(`There is no channel "${msg.content.split(' ')[2]}"`)
    }
  } else {
    msg.channel.send('You did not enter channel name')
  }
}