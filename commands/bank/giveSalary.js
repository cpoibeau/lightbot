let User = require('../../models/user.model')

module.exports = (msg, prefix, args) => {

  User.updateMany(
    { guildID: msg.guild.id },
    [{ $set: { balance: { $sum: ['$balance', '$salary'] } } }],
    (err) => {
      if (err) {
        msg.channel.send('Failed to give salary')
      } else {
        msg.channel.send('Salary has been successfully given to all accounts')
      }
    }
  )
}