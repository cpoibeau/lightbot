let User = require('../../models/user.model')

module.exports = (msg, prefix, args, db) => {
  let regex = /<@!?(\d+)>/

    if(regex.test(msg.content)){

      if(msg.guild.members.find('id', regex.exec(msg.content)[1])){
        let user = msg.guild.members.find('id', regex.exec(msg.content)[1])
        
        User.findOne(
          { userID: user.id, guildID: msg.guild.id },
          (err, doc) => {
            if (err) {
              msg.channel.send('There is no account for this user')
              console.error(err)
            } else {
              msg.channel.send(`Available balance : \`${doc.balance}\``)
            }
          }
        )

      } else {
        msg.channel.send('You must enter a valid user tag')
      }
    } else {
      msg.channel.send('You must enter a user tag')
    }
}