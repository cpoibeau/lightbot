const Connection = require('../../config/connection')

let db = new Connection().sqlConnection()

module.exports = class Music {
  constructor(prefix, msg) {
    this.prefix = prefix
    this.message = msg
  }

  setPrefix(){
    let regex = /([!:;,%_-]{1,2})|([\w\d]{1,4}-)/i

    if(regex.test(this.message.content.split(' ')[2])){
      this.prefix = regex.exec(this.message.content.split(' ')[2])[0]
      this.message.channel.send(`Bot prefix has been set to : ${this.prefix}`)
      db.query(`UPDATE guilds SET prefix='${this.prefix}' WHERE discord_id='${this.message.guild.id}'`)
    } else {
      this.message.channel.send('Bot prefix has not been changed :/')
    }
  }
  
  setWelcomeChannel(){
    if(this.message.content.split(' ')[2]){
      let welcomeChannel = this.message.guild.channels.find('name', this.message.content.split(' ')[2])
  
      if(welcomeChannel){
        this.message.channel.send(`Welcome messages channel has been set to : ${welcomeChannel.name}`)
        db.query(`UPDATE guilds SET welcomeChannel='${welcomeChannel.id}' WHERE discord_id='${this.message.guild.id}';`)
  
      } else {
        this.message.channel.send(`There is no channel "${this.message.content.split(' ')[2]}"`)
      }
  
    } else {
      this.message.channel.send('You did not enter channel name')
    }
  }
  
  setWelcomeMessage(){
    if (this.message.content.slice(this.prefix.length + 'setWelcomeMessage '.length)){
      let welcomeMessage = this.message.content.slice((this.prefix.length + 'setWelcomeMessage '.length))
      
      db.query(`UPDATE guilds SET welcomeMessage='${welcomeMessage}' WHERE discord_id='${this.message.guild.id}';`)
      this.message.channel.send(`Welcome message has been set to : ${welcomeMessage}`)
  
    } else {
      this.message.channel.send(' You did not enter welcome message')
    }
  }

  help(){
    this.message.channel.send("Command not found :/")
  }
}

