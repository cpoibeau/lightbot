const Discord = require('discord.js');
const Connection = require('./config/connection.js');
const TextCommand = require('./src/commands.js');

let client = new Discord.Client();
let connection = new Connection();

let db = connection.sqlConnection();

//Database connection
db.connect((err) => {
  if(err) throw err;
  console.log('Connection with batabase etablished !');
});

// Ready + liste des seveurs
client.on('ready', () => {
  console.log('Ready !');
  Array.from(client.guilds.keys()).forEach((element) => {
    let guild = client.guilds.get(element);
    let parsed_date = guild.createdAt.toJSON().replace('T', ' ').split('.')[0];
    db.query(`INSERT INTO guilds (discord_id, name, creation_date) VALUES (${guild.id}, '${guild.name}', '${parsed_date}') `+
    `ON DUPLICATE KEY UPDATE name='${guild.name}', last_connexion=NOW();`);

  });
  client.user.setActivity(`Say lb-help for help !`, {
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
  if (!msg.author.bot) {

    let prefix = 'lb-';
    let command = new TextCommand(prefix, msg);
    let reg = new RegExp('^' + prefix, 'i');

    if (msg.guild != undefined){   // Guild commands
      db.query(`SELECT prefix FROM guilds WHERE discord_id=${msg.guild.id};`, (err, result) => {
        if (err) throw err;

        prefix = result[0].prefix;

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
            command.setPrefix();

          } else if (msg.content.startsWith(prefix + 'purge')){
            command.purge();

          } else if (msg.content.startsWith(prefix + 'setWelcomeChannel')) {
            command.setWelcomeChannel();

          } else if (reg.test(msg.content)){
            msg.channel.send("Command not found :/");
          }

        } else if (reg.test(msg.content)){
          msg.channel.send("Command not found, you may not be allowed to use it :/");
        }
      });

      } else {  // DM commands
        let prefix = 'lb-';
        if (msg.content.startsWith(prefix + 'help')) {
          command.help();

        } else if (msg.content.startsWith(prefix + 'ping')) {
          command.ping();

        } else if (msg.content.startsWith(prefix + 'search')) {
          command.search();

        } else if (msg.content.startsWith(prefix + 'userInfos')) {
          command.userInfos();

        } else if (reg.test(msg.content)){
          msg.channel.send("Command not found, you may have entered a command only available on a Discord server :/");
        }
      }
  }
});

// Welcome message
client.on('guildMemberAdd', (member) => {
  member.send(`Bienenue sur le serveur ${member.user.username} !`);
  db.query(`SELECT welcomeChannel FROM guilds WHERE discord_id='${member.guild.id}'`, (err, result) => {
    if (err) throw err;
    if (result){
      member.guild.channels.get(result[0].welcomeChannel).send('Bienvenue sur le serveur <@' + member.user.id + '> !');
    }
  });
});

client.on('error', (err) => {
  console.error(err);
})

client.login(connection.betaToken);