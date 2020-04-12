module.exports = (msg, prefix, args, db) => {
  let regex = /<@!?(\d+)>/

    if(regex.test(msg.content)){

      if(msg.guild.members.find('id', regex.exec(msg.content)[1])){

        let user = msg.guild.members.find('id', regex.exec(msg.content)[1])
        db.query(`INSERT INTO users (discord_id, username, guild_id, guild_name) VALUES ('${user.id}', '${user.displayName}', '${msg.guild.id}', '${msg.guild.name}');`, (err)=> {
          
          if(err){
            msg.channel.send('This account is already existing')
            console.error(err)
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