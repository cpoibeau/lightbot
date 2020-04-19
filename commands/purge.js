module.exports = (client, msg, prefix, args) => {
  let a = Number(args[0])

  if (a <= 100) {
    msg.channel.bulkDelete(a)
    .catch(err => {
      msg.channel.send('Can\'t delete messages that are under 14 days old')
    })
    
  } else {
    msg.channel.send('You did not enter a valid number')
  }
}