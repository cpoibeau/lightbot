module.exports = (member) => {
  member.send(`Welcome on ${member.guild.name}, ${member.user.username} !`)
  
  db.query(`SELECT welcomeChannel FROM guilds WHERE discord_id='${member.guild.id}'`, (err, result) => {
    if (err) throw err
    if (result){
      member.guild.channels.get(result[0].welcomeChannel).send(`Welcome on our server ${member} !`)
    }
  })
}