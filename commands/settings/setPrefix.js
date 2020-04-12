module.exports = (msg, prefix, args, db) => {
  let regex = /([!:;,%_-]{1,2})|([\w\d]{1,4}-)/i
  console.log(args)

  if(args[1].match(regex)){
    prefix = args[1]
    msg.channel.send(`Bot prefix has been set to : ${prefix}`)
    db.query(`UPDATE guilds SET prefix='${prefix}' WHERE discord_id='${msg.guild.id}'`)
    
  } else {
    msg.channel.send('Bot prefix has not been changed :/')
  }
}