const discord = require('discord.js');
const fs = require('fs');
let bot = new discord.Client();

var prefix = 'lb-';

//Ready + liste des seveurs
bot.on('ready', () => {
    console.log('Je suis pret');
    let guildsId = Array.from(bot.guilds.keys());
    guildsId.forEach(element => {
        console.log(bot.guilds.get(element).name);
    });
});

//Modification du préfixe
/*
bot.on('message', (msg) => {
    if(msg.content.includes(prefix + 'setPrefix')){
        let parsedString = msg.content.split(' ');
        prefix = parsedString[1];
        msg.channel.send(`Bot prefix has been set to : ${prefix}`)
    }
})
*/
//Ping
bot.on('message', (msg) => {
    if(msg.content.includes(prefix + 'ping')){
        msg.channel.send('`pong !`');
    }
});

//Message de bienvenue
bot.on('guildMemberAdd', (member) => {
    member.send('Bienenue sur le serveur ' + member.user.username + ' !');
    member.guild.channels.get('478166745669173271').send('Bienvenue sur le serveur <@' + member.user.id + '> !');
});

//Purge des messages
/*
bot.on('message', (msg) => {
    if(msg.content === '!purge'){
        let messages = msg.channel.fetchMessages();
        messages.catch
    }
});
*/


bot.login('test');