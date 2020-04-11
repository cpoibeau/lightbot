module.exports = (client, msg, db) => {
  if (msg.author.bot) return

  //prefix selection
  db.query(`SELECT prefix FROM guilds WHERE discord_id='${msg.guild.id}'`, (err, result) => {
    if (err) throw err
    let prefix = result[0].prefix

    if (!msg.content.startsWith(prefix)) return
    console.log(msg.content)

    const args = msg.content.split(/ +/g)
    reg = new RegExp(prefix + '(\\S+)')
    const cmd = args.shift().toLowerCase().match(reg)[1]

    if (client.commands.has(cmd)){
      client.commands.get(cmd)(client, msg, args)
    }
  })
}