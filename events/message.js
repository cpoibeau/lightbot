module.exports = (client, db, msg) => {
  if (msg.author.bot || !msg.guild) return

  //prefix selection
  db.query(`SELECT prefix FROM guilds WHERE discord_id='${msg.guild.id}'`, (err, result) => {
    if (err) throw err
    let prefix = result[0].prefix

    if (!msg.content.startsWith(prefix)) return
    console.log(`${msg.author.tag} used : '${msg.content}' on ${msg.guild}`)

    const args = msg.content.split(/ +/g)
    reg = new RegExp(prefix + '(\\S+)')
    const cmd = args.shift().toLowerCase().match(reg)[1]

    if (!client.commands.has(cmd)) return
    if (typeof client.commands.get(cmd) === 'object') {
      if (!args[0]) return
      if (!client.commands.get(cmd).has(args[0].toLowerCase())) return
      
      client.commands.get(cmd).get(args[0].toLowerCase())(msg, prefix, args, db)
    } else {

      client.commands.get(cmd)(client, msg, prefix, args, db)
    } 
  })
}