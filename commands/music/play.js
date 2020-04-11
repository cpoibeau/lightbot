module.exports = (client, msg, prefix, args, db) => {
  if(msg.guild.voiceConnection){
    if(msg.guild.voiceConnection.dispatcher){
      msg.guild.voiceConnection.dispatcher.resume()
    } else {
      const dispatcher = msg.guild.voiceConnection.playFile('D:/Documents/Développement/JavaScript/lightbot/music.mp3')
    }
  } else {
    msg.channel.send('I must join a voice channel first !')
  }
}