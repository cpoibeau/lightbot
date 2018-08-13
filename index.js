const Discord = require('discord.js');
const Connection = require('./config/connection.js');
let client = new Discord.Client();
let connection = new Connection();

let prefix = 'lb-';
let welcomeChannel;

// Ready + liste des seveurs
client.on('ready', () => {
  console.log('Ready !');
  Array.from(client.guilds.keys()).forEach((element) => {
    console.log(`> ${client.guilds.get(element).name}`);
  });
  client.user.setActivity(`Say ${prefix}help for help !`, {
    url: 'https://discord.js.org',
    type: 'PLAYING'
  });
});

function adminCheckFromMsg(msg){
  let member2Check = msg.guild.members.get(msg.author.id);
  return member2Check.hasPermission('MANAGE_CHANNELS') || member2Check.hasPermission('MANAGE_GUILD');
}

// Commands
client.on('message', (msg) => {
  if (msg.author != client.user) {
    let reg = new RegExp('^' + prefix, 'i');
    if (msg.content.includes(prefix + 'help')) { // help
      msg.channel.send(
        `\`${prefix}help\` - Display help\n` +
        `\`${prefix}ping\` - Answer "pong !"\n` +
        `\`${prefix}population\` - Display the current member count of this Discord server\n` +
        `\`${prefix}search <your-search>\` - Search on google\n` +
        `\`${prefix}purge <number>\` - *(admin)* Delete the lasts messages on the current channel\n` +
        `\`${prefix}setPrefix <prefix>\` - *(admin)* Changes the bot's command prefix\n` +
        `\`${prefix}exit\` - *(admin)* Disable the bot from the server until it's rebooted`
      );

    } else if (msg.content.includes(prefix + 'ping')) { // ping
      msg.channel.send('`pong !`');

    } else if (msg.content.includes(prefix + 'search')) {   // search
      let search = msg.content.slice(prefix.length + 'search '.length).replace(/ /g, '+');
      msg.channel.send(`http://google.com/search?q=${search}`);

    } else if (msg.content.includes(prefix + 'population')){    // population
      msg.channel.send(`There are ${msg.guild.memberCount} members on this Discord server`);

    } else if(adminCheckFromMsg(msg)) { // admin commands
      if (msg.content.includes(prefix + 'setPrefix')) {   // setPrefix
        let regex = /([!?:;,*%$_-]{1,2})|([\S]{1,4}-)/i;
        if(regex.test(msg.content.split(' ')[1])){
          prefix = regex.exec(msg.content.split(' ')[1])[0];
          msg.channel.send(`Bot prefix has been set to : ${prefix}`);
          client.user.setActivity(`Say ${prefix}help for help !`, {
            url: 'https://discord.js.org',
            type: 'PLAYING'
          });
        } else {
          msg.channel.send(`Bot prefix has not been changed :/`);
          //TODO:insert a link to the documentation here
        }
      } else if (msg.content === prefix + 'exit') {   // exit
        msg.delete();
        client.destroy();
      } else if (msg.content.includes(prefix + 'purge')){ // purge
        let a = Number(msg.content.split(' ')[1]) + 1;
        msg.channel.fetchMessages({
          limit: a
        }).then((messages) => {
          messages.deleteAll();
          console.log(`${a} messages deleted`);
        }).catch(console.error);
                
      } else if (msg.content.includes(prefix + 'setWelcomeChannel')) {    // setWelcomeChannel
        if(msg.content.split(' ')[1]){
          let welcomeChannel = msg.guild.channels.find('name', msg.content.split(' ')[1]);
      
          if(welcomeChannel){
            msg.channel.send(`Welcome messages channel has been set to : ${welcomeChannel.name}`);
            return welcomeChannel.id;
      
          } else {
              msg.channel.send(`There is no channel "${msg.content.split(' ')[1]}"`);
          }
          
        } else {
            msg.channel.send('You did not enter channel name');
        }
      } else if(reg.test(msg.content)){
            msg.channel.send("Command not found :/");
      }
      
    } else if(reg.test(msg.content)){
        msg.channel.send("Command not found, you may not be allowed to use it :/");
    }
  }
});

// Welcome message
client.on('guildMemberAdd', (member) => {
  member.send('Bienenue sur le serveur ' + member.user.username + ' !');
  if(welcomeChannel){
    member.guild.channels.get(welcomeChannel).send('Bienvenue sur le serveur <@' + member.user.id + '> !');
  }
});

client.login(connection.token);