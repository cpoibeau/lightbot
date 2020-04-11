module.exports = (client, msg, prefix, args, db) => {
  if(msg.guild.voiceConnection){
    if(msg.guild.voiceConnection.dispatcher){
    msg.guild.voiceConnection.dispatcher.end()
    }
  } else {
    msg.channel.send('I must play music first !')
  }
}