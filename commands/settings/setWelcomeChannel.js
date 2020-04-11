module.exports = (client, msg, prefix, args, db) => {
  if(msg.content.split(' ')[2]){
    let welcomeChannel = msg.guild.channels.find('name', msg.content.split(' ')[2])
  
    if(welcomeChannel){
      msg.channel.send(`Welcome messages channel has been set to : ${welcomeChannel.name}`)
      db.query(`UPDATE guilds SET welcomeChannel='${welcomeChannel.id}' WHERE discord_id='${msg.guild.id}';`)
  
    } else {
      msg.channel.send(`There is no channel "${msg.content.split(' ')[2]}"`)
    }
  
  } else {
    msg.channel.send('You did not enter channel name')
  }
}