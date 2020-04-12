module.exports = (msg, prefix, args, db) => {
  if(msg.member.voiceChannel){
    msg.member.voiceChannel.join().then(connection => {
      msg.channel.send('I have successfully connected to the channel !')
    }).catch(console.log)
  } else {
    msg.channel.send('You must join a voice channel first !')
  }
}