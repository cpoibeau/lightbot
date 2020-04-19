let User = require('../../models/user.model')

module.exports = (msg, prefix, args) => {
  let regex = /<@!?(\d+)> (-?\d+)$/

  if(regex.test(msg.content)){

    if(msg.guild.members.find('id', regex.exec(msg.content)[1])){
      let user = msg.guild.members.find('id', regex.exec(msg.content)[1])

      if(msg.guild.members.find('id', msg.author.id).hasPermission('MANAGE_GUILD')){

        User.update(
          { userID: user.id, guildID: msg.guild.id },
          { $inc: {
            balance: parseInt(regex.exec(msg.content)[2])
          } },
          (err) => {
            if (err) {
              msg.channel.send('Failed to credit this user')
            } else {
              msg.channel.send(`This account has been successfully credited !\n`)
            }
          }
        )
      } else {
        msg.channel.send('You\'re not allowed to use this command')
      }
    } else {
      msg.channel.send('You must enter a valid user tag')
    }
  } else {
    msg.channel.send('You must enter a user tag and an amount')
  }
}