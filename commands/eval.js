module.exports = (client, msg, prefix, args) => {
  if (msg.author.id != '199262540826542081') return undefined

  eval(args.join(' '))
  msg.channel.send('Code received')
}