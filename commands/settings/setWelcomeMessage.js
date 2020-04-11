module.exports = (client, msg, prefix, args, db) => {
  if (msg.content.slice(prefix.length + 'setWelcomeMessage '.length)){
    let welcomeMessage = msg.content.slice((prefix.length + 'settings setWelcomeMessage '.length))
    
    db.query(`UPDATE guilds SET welcomeMessage='${welcomeMessage}' WHERE discord_id='${msg.guild.id}';`)
    msg.channel.send(`Welcome message has been set to : ${welcomeMessage}`)

  } else {
    msg.channel.send(' You did not enter welcome message')
  }
}