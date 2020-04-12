module.exports = (client, msg, prefix, args, db) => {
  if (client.music.has(args[0].toLowerCase())){
    client.music.get(args[0].toLowerCase())(msg, prefix, args, db)
  }
}