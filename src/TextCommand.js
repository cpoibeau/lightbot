const Discord = require('discord.js')
const Bank = require('./commands/Bank')
const Music = require('./commands/Music')
const Settings = require('./commands/Settings')

module.exports = class TextCommand {
  constructor(prefix, msg){
    this.message = msg
    this.prefix = prefix
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