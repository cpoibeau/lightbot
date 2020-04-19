let User = require('../../models/user.model')

module.exports = (msg, prefix, args) => {
  let regex = /<@!?(\d+)> <@!?(\d+)> (\d+)$/

  if(!regex.test(msg.content)) {
    msg.channel.send('You must enter two user tags and a positive amount')
    return
  }
  if(!msg.guild.members.find('id', regex.exec(msg.content)[1]) || !msg.guild.members.find('id', regex.exec(msg.content)[2])) {
    msg.channel.send('You must enter valid user tags')
    return
  }

  let user1 = msg.guild.members.find('id', regex.exec(msg.content)[1])
  let user2 = msg.guild.members.find('id', regex.exec(msg.content)[2])
  let amount = regex.exec(msg.content)[3]
  
  User.update(
    { userID: user1.id, guildID: msg.guild.id },
    { $inc: {
      balance: -amount
    } },
    (err) => {
      if (err) {
        msg.channel.send('Transfer failed')
      } else {
        User.update(
          { userID: user2.id, guildID: msg.guild.id },
          { $inc: {
            balance: amount
          } },
          (err) => {
            if (err) {
              msg.channel.send('Transfer failed')
            } else {
              msg.channel.send(`Success to tranfer this amount: ${amount}`)
            }
          }
        )
      }
    }
  )
}