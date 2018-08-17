const Discord = require('discord.js');
const Connection = require('./config/connection.js');
const TextCommand = require('./src/commands.js');
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
  let command = new TextCommand(prefix, msg);
  let reg = new RegExp('^' + prefix, 'i');

  if (!msg.author.bot) {
    if (msg.guild != undefined){   // Guild commands
      if (msg.content.startsWith(prefix + 'help')) {
        command.help();

      } else if (msg.content.startsWith(prefix + 'ping')) {
        command.ping();

      } else if (msg.content.startsWith(prefix + 'search')) {
        command.search();

      } else if (msg.content.startsWith(prefix + 'population')){
        command.population();

      } else if (msg.content.startsWith(prefix + 'userInfos')) {
        command.userInfos();

      } else if (adminCheckFromMsg(msg)) { // admin commands
        if (msg.content.startsWith(prefix + 'setPrefix')) {
          prefix = command.setPrefix();

        } else if (msg.content.startsWith(prefix + 'purge')){
          command.purge();

        } else if (msg.content.startsWith(prefix + 'setWelcomeChannel')) {
          welcomeChannel = command.setWelcomeChannel();

        } else if (reg.test(msg.content)){
          msg.channel.send("Command not found :/");
        }

      } else if (reg.test(msg.content)){
        msg.channel.send("Command not found, you may not be allowed to use it :/");
      }

    } else {  // DM commands
      if (msg.content.startsWith(prefix + 'help')) {
        command.help();

      } else if (msg.content.startsWith(prefix + 'ping')) {
        command.ping();

      } else if (msg.content.startsWith(prefix + 'search')) {
        command.search();

      } else if (msg.content.startsWith(prefix + 'setPrefix')) {
        prefix = command.setPrefix();

      } else if (msg.content.startsWith(prefix + 'purge')){
        command.purge();

      } else if (msg.content.startsWith(prefix + 'userInfos')) {
        command.userInfos();

      } else if (reg.test(msg.content)){
        msg.channel.send("Command not found, you may have entered a command only available on a Discord server :/");
      } else if (test){
        console.log('test');
      }
    }
  }
});

// Welcome message
client.on('guildMemberAdd', (member) => {
  member.send(`Bienenue sur le serveur ${member.user.username} !`);
  if (welcomeChannel){
    member.guild.channels.get(welcomeChannel).send('Bienvenue sur le serveur <@' + member.user.id + '> !');
  }
});

client.on('error', (err) => {
  console.error(err);
})

client.login(connection.token);