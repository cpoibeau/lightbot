const Discord = require('discord.js');

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
        `\`${this.prefix}search <your-search>\` - Search on google\n` +
        `\`${this.prefix}userInfos\` - Send you a DM with additional informations about your account\n` +
        `\`${this.prefix}purge <number>\` - *(admin)* Delete the lasts messages on the current channel\n` +
        `\`${this.prefix}setPrefix <prefix>\` - *(admin)* Changes the bot's command prefix\n` +
        `\`${this.prefix}setWelcomeChannel\` - *(admin)* Sets the channel where welcome messages will be diplayed\n`
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
    this.message.delete();
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
    this.message.channel.fetchMessages({
        limit: a
    }).then((messages) => {
        messages.deleteAll();
        console.log(`${a} messages deleted`);
    }).catch(console.error);
  }

  setPrefix(){
    let regex = /([!:;,%_-]{1,2})|([\S]{1,4}-)/i;
    if(regex.test(this.message.content.split(' ')[1])){
      this.prefix = regex.exec(this.message.content.split(' ')[1])[0];
      this.message.channel.send(`Bot prefix has been set to : ${this.prefix}`);
      return this.prefix;
    } else {
      this.message.channel.send('Bot prefix has not been changed :/');
      return this.prefix;
    }
  }

  setWelcomeChannel(){
    if(this.message.content.split(' ')[1]){
      let welcomeChannel = this.message.guild.channels.find('name', this.message.content.split(' ')[1]);

      if(welcomeChannel){
        this.message.channel.send(`Welcome messages channel has been set to : ${welcomeChannel.name}`);
        return welcomeChannel.id;

      } else {
        this.message.channel.send(`There is no channel "${this.message.content.split(' ')[1]}"`);
      }

    } else {
      this.message.channel.send('You did not enter channel name');
    }
  }
}