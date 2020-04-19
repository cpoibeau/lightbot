let User = require('../../models/user.model')

module.exports = (msg, prefix, args) => {
  let regex = /<@!?(\d+)>/

  if(regex.test(msg.content)){

    if(msg.guild.members.find('id', regex.exec(msg.content)[1])){

      let user = msg.guild.members.find('id', regex.exec(msg.content)[1])

      User.findOneAndUpdate(
        { userID: user.id, guildID: msg.guild.id },
        { $setOnInsert: {
            userID: user.id,
            username: user.user.username,
            guildID: msg.guild.id,
            guildName: msg.guild.name,
            balance: 0,
            salary: 0
          } },
        { upsert: true, new: true },
        (err) => {
          if (err) {
            console.error(err)
            msg.channel.send('Error creating the account')
          } else {
            msg.channel.send('Account successfully created')
          }
        })

    } else {
      msg.channel.send('You must enter a valid user tag')
    }
  } else {
    msg.channel.send('You must enter a user tag')
  }
}