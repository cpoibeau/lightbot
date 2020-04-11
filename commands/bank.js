module.exports = (client, msg, prefix, args, db) => {
  if (client.bank.has(args[0].toLowerCase())){
    client.bank.get(args[0].toLowerCase())(client, msg, prefix, args, db)
  }
}