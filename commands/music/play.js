module.exports = (msg, prefix, args, db) => {
  if(msg.member.voiceChannel){
    msg.member.voiceChannel.join()
    .catch(console.log)
    .then(connection => {
      msg.channel.send('I have successfully connected to the channel !')
    })
  } else {
    msg.channel.send('You must join a voice channel first !')
  }

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