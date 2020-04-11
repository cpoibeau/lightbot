module.exports = (client, msg, prefix, args, db) => {
  let regex = /<@!?(\d+)> (-?\d+)$/

  if(regex.test(msg.content)){

    if(msg.guild.members.find('id', regex.exec(msg.content)[1])){
      let user = msg.guild.members.find('id', regex.exec(msg.content)[1])

      if(msg.guild.members.find('id', msg.author.id).hasPermission('MANAGE_GUILD')){
        db.query(`SELECT balance FROM users WHERE discord_id='${user.id}' AND guild_id='${msg.guild.id}';`, (err, result)=>{
          if(err){
            msg.channel.send('Failed to credit this user')

          } else {
            let balance = parseInt(result[0].balance)
            let amount = balance + parseInt(regex.exec(msg.content)[2])
            db.query(`UPDATE users SET balance=${amount} WHERE discord_id='${user.id}' AND guild_id='${msg.guild.id}'`, (err)=>{
              
              if(err){
                msg.channel.send('Failed to credit this user')
              } else {
                msg.channel.send(`This account has been successfully credited !\n Balance is now \`${amount}\``)
              }
            })
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