module.exports = (client, msg, prefix, args, db) => {
  let user = msg.guild.members.find('id', msg.author.id)

  if(user.hasPermission('MANAGE_GUILD')) {
    db.query(`UPDATE users SET balance=balance+salary;`, (err)=>{

      if(err){
        msg.channel.send('Failed to give salary')
      } else {
        msg.channel.send('Salary has been successfully given to all accounts')
      }
    })
  } else {
    msg.channel.send('You\'re not allowed to use this command')
  }
}