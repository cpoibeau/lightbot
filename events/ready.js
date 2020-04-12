module.exports = (client, db) => {
  Array.from(client.guilds.keys()).forEach((element) => {
    let guild = client.guilds.get(element)
    let parsed_date = guild.createdAt.toJSON().replace('T', ' ').split('.')[0]
    
    db.query(`INSERT INTO guilds (discord_id, name, creation_date) VALUES 
      ('${guild.id}', '${guild.name}', '${parsed_date}') 
      ON DUPLICATE KEY UPDATE name='${guild.name}', last_connexion=NOW();`)
  })

  client.user.setActivity(`Say lb-help for help !`, {
    url: 'https://discord.js.org',
    type: 'PLAYING'
  })
}