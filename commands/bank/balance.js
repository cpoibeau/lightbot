module.exports = (msg, prefix, args, db) => {
  let regex = /<@!?(\d+)>/

    if(regex.test(msg.content)){

      if(msg.guild.members.find('id', regex.exec(msg.content)[1])){
        let user = msg.guild.members.find('id', regex.exec(msg.content)[1])
        db.query(`SELECT balance FROM users WHERE discord_id='${user.id}' AND guild_id='${msg.guild.id}';`, (err, result)=>{
          
          if(err){
            msg.channel.send('There is no account for this user')
          } else {
            msg.channel.send(`Available balance : \`${result[0].balance}\``)
          }
        })

      } else {
        msg.channel.send('You must enter a valid user tag')
      }
    } else {
      msg.channel.send('You must enter a user tag')
    }
}