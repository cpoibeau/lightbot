module.exports = (client, db, member) => {
  member.send(`Welcome on ${member.guild.name}, ${member.user.username} !`)
  
  db.query(`SELECT welcomeChannel FROM guilds WHERE discord_id='${member.guild.id}'`, (err, result) => {
    if (err) throw err
    if (result){
      welcomeChannel = member.guild.channels.get(result[0].welcomeChannel)

      db.query(`SELECT welcomeMessage FROM guilds WHERE discord_id='${member.guild.id}'`, (err2, result2) => {
        if (result2){
          welcomeChannel.send(member + ' ' + result2[0].welcomeMessage)
        } else {
          welcomeChannel.send(`Welcome on our server ${member} !`)
        }
      })
    }
  })
}