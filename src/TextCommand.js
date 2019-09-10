const Discord = require('discord.js')
const Connection = require('../config/connection.js')
const Bank = require('./commands/Bank')

let db = new Connection().sqlConnection();

module.exports = class TextCommand {
  constructor(prefix, msg){
    this.message = msg;
    this.prefix = prefix;
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
        `\`${this.prefix}purge\` \`<number>\` - *(admin)* Delete the lasts messages on the current channel\n` +
        `\`${this.prefix}setPrefix\` \`<prefix>\` - *(admin)* Changes the bot's command prefix\n` +
        `\`${this.prefix}setWelcomeChannel\` - *(admin)* Sets the channel where welcome messages will be diplayed\n` +
        `\`${this.prefix}setWelcomeMessage\` - *(admin)* Sets the channel where welcome messages will be diplayed\n` +
        `\`${this.prefix}bank\` - All bank system commands. Type \`${this.prefix}bank help\` to get some help about the bank system`
      )
      .setFooter(`Requested by : ${this.message.author.tag}`)
    );
  }

  ping(){
    this.message.channel.send('pong !');
  }

  search(){
    let search = this.message.content.slice(this.prefix.length + 'search '.length).replace(/ /g, '+');
    this.message.channel.send(`http://google.com/search?q=${search}`);
  }

  population(){
    this.message.channel.send(`There are ${this.message.guild.memberCount} members on this Discord server`);
  }

  userInfos(){
    this.message.delete().catch(err => {
      console.error(err);
    });
    let creationDate = this.message.author.createdAt.toString().split(' ');
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
    );
  }

  purge(){
    let a = Number(this.message.content.split(' ')[1]) + 1;
    if (a && a <= 100) {
      this.message.channel.bulkDelete(a)
      .catch(console.error);
    } else {
      this.message.channel.send('You did not enter a valid number');
    } //TODO : Ajouter une gestion d'exception lorsque les messages sélectionés sont datés de + de 14 jours
  }

  setPrefix(){
    let regex = /([!:;,%_-]{1,2})|([\w\d]{1,4}-)/i;
    if(regex.test(this.message.content.split(' ')[1])){
      this.prefix = regex.exec(this.message.content.split(' ')[1])[0];
      this.message.channel.send(`Bot prefix has been set to : ${this.prefix}`);
      db.query(`UPDATE guilds SET prefix='${this.prefix}' WHERE discord_id='${this.message.guild.id}'`);
    } else {
      this.message.channel.send('Bot prefix has not been changed :/');
    }
  }

  setWelcomeChannel(){
    if(this.message.content.split(' ')[1]){
      let welcomeChannel = this.message.guild.channels.find('name', this.message.content.split(' ')[1]);

      if(welcomeChannel){
        this.message.channel.send(`Welcome messages channel has been set to : ${welcomeChannel.name}`);
        db.query(`UPDATE guilds SET welcomeChannel='${welcomeChannel.id}' WHERE discord_id='${this.message.guild.id}';`);

      } else {
        this.message.channel.send(`There is no channel "${this.message.content.split(' ')[1]}"`);
      }

    } else {
      this.message.channel.send('You did not enter channel name');
    }
  }

  setWelcomeMessage(){
    if (this.message.content.slice(this.prefix.length + 'setWelcomeMessage '.length)){
      let welcomeMessage = this.message.content.slice((this.prefix.length + 'setWelcomeMessage '.length));
      
      db.query(`UPDATE guilds SET welcomeMessage='${welcomeMessage}' WHERE discord_id='${this.message.guild.id}';`);
      this.message.channel.send(`Welcome message has been set to : ${welcomeMessage}`)

    } else {
      this.message.channel.send(' You did not enter welcome message');
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