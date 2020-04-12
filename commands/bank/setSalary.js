module.exports = (msg, prefix, args, db) => {let regex = /<@!?(\d+)> (\d+)$/

  if(regex.test(msg.content)){

    if(msg.guild.members.find('id', regex.exec(msg.content)[1])){
      let user = msg.guild.members.find('id', regex.exec(msg.content)[1])
      let amount = regex.exec(msg.content)[2]

      if(msg.guild.members.find('id', msg.author.id).hasPermission('MANAGE_GUILD')){
        db.query(`UPDATE users SET salary=${amount} WHERE discord_id='${user.id}' AND guild_id='${msg.guild.id}';`, (err)=>{
        
          if(err){
            msg.channel.send('Failed to set the salary of this user')
          } else {
            msg.channel.send(`The salary of this user is now \`${amount}\``)
          }
        })
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