const ytdl = require('ytdl-core');

module.exports = (msg, prefix, args) => {
  if(msg.member.voiceChannel){
    msg.member.voiceChannel.join()
    .catch(console.log)
    .then(voiceConnection => {
    args.shift()
    askedSong = args.join(' ')

    if(voiceConnection.dispatcher && !askedSong){
        voiceConnection.dispatcher.resume()
      } else if (voiceConnection.dispatcher && askedSong) {
        console.log('addPlaylist')
      } else {
        const dispatcher = voiceConnection.playStream(ytdl(askedSong, {filter: 'audioonly'}))
      }
    })
    
  } else {
    msg.channel.send('You must join a voice channel first !')
  }
}