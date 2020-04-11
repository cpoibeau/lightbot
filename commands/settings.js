module.exports = (client, msg, prefix, args, db) => {
  if (client.settings.has(args[0].toLowerCase())){
    client.settings.get(args[0].toLowerCase())(client, msg, prefix, args, db)
  }
}