let User = require('../../models/user.model')

module.exports = (msg, prefix, args) => {
  let regex = /<@!?(\d+)> (\d+)$/

  if(regex.test(msg.content)){

    if(msg.guild.members.find('id', regex.exec(msg.content)[1])){
      let user = msg.guild.members.find('id', regex.exec(msg.content)[1])
      let amount = regex.exec(msg.content)[2]

      User.update(
        { userID: user.id, guildID: msg.guild.id },
        { $set: {
          salary: amount
        } },
        (err) => {
          if (err) {
            msg.channel.send('Failed to set the salary of this user')
          } else {
            msg.channel.send(`The salary of this user is now \`${amount}\``)
          }
        }
      )

    } else {
      msg.channel.send('You must enter a valid user tag')
    }
  } else {
    msg.channel.send('You must enter a user tag and an amount')
  }
}