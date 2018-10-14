const Discord = require('discord.js');
const Connection = require('../config/connection.js');

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
    }
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
    if (this.message.content.slice((this.prefix.length + 'setWelcomeMessage '.length))){
      let welcomeMessage = this.message.content.slice((this.prefix.length + 'setWelcomeMessage '.length));
      
      db.query(`UPDATE guilds SET welcomeMessage='${welcomeMessage}' WHERE discord_id='${this.message.guild.id}';`);
      this.message.channel.send(`Welcome message has been set to : ${welcomeMessage}`)

    } else {
      this.message.channel.send(' You did not enter welcome message');
    }
  }
  
  time(){
    let date_test = new Date('2018-10-14T12:00:00');
    let current_date = new Date();


    let result = new Date(current_date.getTime()-date_test.getTime());

    this.message.channel.send(`Temps écoulé depuis le ${date_test.getDate()}/${date_test.getMonth() + 1}/${date_test.getFullYear()} à ${date_test.getHours()}:${date_test.getMinutes()}0 : ` +
    `${result.getDate() - 1} jours, ${result.getHours() - 1} heures, ${result.getMinutes()} minutes et ${result.getSeconds()} secondes.`)
  }
}