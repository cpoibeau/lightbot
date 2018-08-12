const discord = require('discord.js');
const fs = require('fs');
let client = new discord.Client();

var prefix = 'lb-';

//Ready + liste des seveurs
client.on('ready', () => {
    console.log('Je suis pret');
    let guildsId = Array.from(client.guilds.keys());
    guildsId.forEach((element) => {
        console.log(`> ${client.guilds.get(element).name}`);
    });
    client.user.setActivity(`Say ${prefix}help for help !`, {
        url: 'https://discord.js.org',
        type: 'PLAYING'
    });
});


//Message eventListener

client.on('message', (msg) => {
    if (msg.author != client.user) {
        if (msg.content.includes(prefix + 'setPrefix')) {
            let regex = /([!?:�;,*%$��_-]{1,2})|([\S]{1,4}-)/i;
            if(regex.test(msg.content.split(' ')[1])){
                console.log(regex.exec(msg.content.split(' ')[1])[0]);
            }
            msg.channel.send(`Bot prefix has been set to : ${prefix}`)
            client.user.setActivity(`Say ${prefix}help for help !`, {
                url: 'https://discord.js.org',
                type: 'PLAYING'
            });

        } else if (msg.content.includes(prefix + 'help')) {
            msg.channel.send(
                `\`${prefix}help\`\n` +
                `${prefix}ping \n` +
                `${prefix}setPrefix\n`
            )

        } else if (msg.content.includes(prefix + 'ping')) {
            msg.channel.send('`pong !`');

        } else if (msg.content === prefix + 'exit') {
            msg.delete();
            client.destroy();
        }
    }
});

//Welcome message
client.on('guildMemberAdd', (member) => {
    member.send('Bienenue sur le serveur ' + member.user.username + ' !');
    member.guild.channels.get('478174436466622465').send('Bienvenue sur le serveur <@' + member.user.id + '> !');
});

//Purge des messages
/*
client.on('message', (msg) => {
    if(msg.content === '!purge'){
        let messages = msg.channel.fetchMessages();
        messages.catch
    }
});
*/

fs.readFile('config/token.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    client.login(data);
});