const Discord = require('discord.js')
const Bank = require('./commands/Bank')
const Music = require('./commands/Music')
const Settings = require('./commands/Settings')

module.exports = class TextCommand {
  constructor(prefix, msg){
    this.message = msg
    this.prefix = prefix
  }

  help() {
    

    this.message.channel.send(new Discord.RichEmbed()
      .setTitle('LightBot Commands :')
      .setColor('#f2ad16')
      .setDescription(
        `\`${this.prefix}help\` - Display help\n` +
        `\`${this.prefix}ping\` - Answer "pong !"\n` +
        `\`${this.prefix}population\` - Display the current member count of this Discord server\n` +
        `\`${this.prefix}search\` \`<your-search>\` - Search on google\n` +
        `\`${this.prefix}userInfos\` - Send you a DM with additional informations about your account\n` +
        `\`${this.prefix}purge\` \`<number>\` - *(admin)* Delete the last messages on the current channel\n` +
        `\`${this.prefix}settings\` - *(admin)* All settings concerning this Discord server. Type \`${this.prefix}settings help\` to get some help about the settings\n` +
        `\`${this.prefix}bank\` - All bank system commands. Type \`${this.prefix}bank help\` to get some help about the bank system`
      )
      .setFooter(`Requested by : ${this.message.author.tag}`)
    )
  }

  ping(){
    this.message.channel.send('pong !')
  }

  search(){
    let search = this.message.content.slice(this.prefix.length + 'search '.length).replace(/ /g, '+')
    this.message.channel.send(`http://google.com/search?q=${search}`)
  }

  population(){
    this.message.channel.send(`There are ${this.message.guild.memberCount} members on this Discord server`)
  }

  userInfos(){
    this.message.delete().catch(err => {
      console.error(err)
    })
    let creationDate = this.message.author.createdAt.toString().split(' ')
    this.message.author.send(new Discord.RichEmbed()
      .setColor('#f2ad16')
      .setTitle('**Your profile :**')
      .setDescription(
        `Username : ${this.message.author.tag}\n` +
        `ID : ${this.message.author.id}\n` +
        `Account creation date : ${creationDate[1]} ${creationDate[2]} ${creationDate[3]} at ${creationDate[4]}\n`
      )
      .setThumbnail(this.message.author.avatarURL)
      .setFooter(`Requested by : ${this.message.author.tag}`)
    )
  }

  purge(){
    let a = Number(this.message.content.split(' ')[1]) + 1
    if (a && a <= 100) {
      this.message.channel.bulkDelete(a)
      .catch(console.error)
    } else {
      this.message.channel.send('You did not enter a valid number')
    } //TODO : Ajouter une gestion d'exception lorsque les messages sélectionés sont datés de + de 14 jours
  }

  settings(){
    if(this.message.content.split(' ')[1]){
      let command = new Settings(this.prefix, this.message)

      if(this.message.content.split(' ')[1] == 'setPrefix'){
        command.setPrefix()

      } else if(this.message.content.split(' ')[1] == 'setWelcomeChannel'){
        command.setWelcomeChannel()

      } else if(this.message.content.split(' ')[1] == 'setWelcomeMessage') {
        command.setWelcomeMessage()

      } else {
        command.help()
      }
    }
  }

  bank(){
    if(this.message.content.split(' ')[1]){
      let command = new Bank(this.prefix, this.message)

      if(this.message.content.split(' ')[1] == 'createAccount'){
        command.createAccount()

      } else if(this.message.content.split(' ')[1] == 'balance'){
        command.balance()

      } else if(this.message.content.split(' ')[1] == 'add') {
        command.add()

      } else if(this.message.content.split(' ')[1] == 'setSalary') {
        command.setSalary()

      } else if(this.message.content.split(' ')[1] == 'giveSalary') {
        command.giveSalary()

      } else if(this.message.content.split(' ')[1] == 'transfer') {
        command.transfer()
      } else {
        command.help()
      }
    }
  }

  music(){
    if(this.message.content.split(' ')[1]){
      let command = new Music(this.prefix, this.message)

      if(this.message.content.split(' ')[1] == 'join'){
        command.join()

      } else if(this.message.content.split(' ')[1] == 'leave'){
        command.leave()

      } else if(this.message.content.split(' ')[1] == 'play') {
        command.play()

      } else if(this.message.content.split(' ')[1] == 'pause') {
        command.pause()

      } else if(this.message.content.split(' ')[1] == 'stop') {
        command.stop()

      } else {
        command.help()
      }
    }
  }
}