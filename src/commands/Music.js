module.exports = class Music {
  constructor(prefix, msg) {
    this.prefix = prefix
    this.message = msg
  }

  join(){
    if(this.message.member.voiceChannel){
      this.message.member.voiceChannel.join().then(connection => {
        this.message.channel.send('I have successfully connected to the channel !')
      }).catch(console.log)
    } else {
      this.message.channel.send('You must join a voice channel first !')
    }
  }

  play(){
    if(this.message.guild.voiceConnection){
      if(this.message.guild.voiceConnection.dispatcher){
        this.message.guild.voiceConnection.dispatcher.resume()
      } else {
        const dispatcher = this.message.guild.voiceConnection.playFile('D:/Documents/Développement/JavaScript/lightbot/music.mp3')
      }
    } else {
      this.message.channel.send('I must join a voice channel first !')
    }
  }

  pause(){
    if(this.message.guild.voiceConnection){
      if(this.message.guild.voiceConnection.dispatcher){
        this.message.guild.voiceConnection.dispatcher.pause()
      }
    } else {
      this.message.channel.send('I must play music first !')
    }
  }

  stop(){
    if(this.message.guild.voiceConnection){
      if(this.message.guild.voiceConnection.dispatcher){
      this.message.guild.voiceConnection.dispatcher.end()
      }
    } else {
      this.message.channel.send('I must play music first !')
    }
  }

  leave(){
    if(this.message.guild.voiceConnection){
      this.message.guild.voiceConnection.channel.leave()
      this.message.channel.send('Channel left !')
    } else {
      this.message.channel.send('I\'m not connected to any channel :/')
    }
  }
}