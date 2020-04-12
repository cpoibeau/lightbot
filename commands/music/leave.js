module.exports = (msg, prefix, args, db) => {
  if(msg.guild.voiceConnection){
    msg.guild.voiceConnection.channel.leave()
    msg.channel.send('Channel left !')
  } else {
    msg.channel.send('I\'m not connected to any channel :/')
  }
}