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

      //createAccount
      if(this.message.content.split(' ')[1] == 'createAccount'){
        let regex = /<@!?(\d+)>/;

        if(regex.test(this.message.content)){
  
          if(this.message.guild.members.find('id', regex.exec(this.message.content)[1])){
            let user = this.message.guild.members.find('id', regex.exec(this.message.content)[1]);
            db.query(`INSERT INTO users (discord_id, username, guild_id, guild_name) VALUES ('${user.id}', '${user.displayName}', '${this.message.guild.id}', '${this.message.guild.name}';)`, (err)=> {
              if(err){
                this.message.channel.send('This account is already existing');
              } else {
                this.message.channel.send('Account successfully created');
              }
            });
          } else {
            this.message.channel.send('You must enter a valid user tag');
          }
        } else {
          this.message.channel.send('You must enter a user tag');
        }

      //balance
      } else if(this.message.content.split(' ')[1] == 'balance'){
        let regex = /<@!?(\d+)>/;

        if(regex.test(this.message.content)){

          if(this.message.guild.members.find('id', regex.exec(this.message.content)[1])){
            let user = this.message.guild.members.find('id', regex.exec(this.message.content)[1]);
            db.query(`SELECT balance FROM users WHERE discord_id='${user.id}' AND guild_id='${this.message.guild.id}';`, (err, result)=>{
              
              if(err){
                this.message.channel.send('There is no account for this user');
              } else {
                this.message.channel.send(`Available balance : \`${result[0].balance}\``);
              }
            });

          } else {
            this.message.channel.send('You must enter a valid user tag');
          }
        } else {
          this.message.channel.send('You must enter a user tag');
        }

      //add
      } else if(this.message.content.split(' ')[1] == 'add') {
        let regex = /<@!?(\d+)> (-?\d+)$/;

        if(regex.test(this.message.content)){

          if(this.message.guild.members.find('id', regex.exec(this.message.content)[1])){
            let user = this.message.guild.members.find('id', regex.exec(this.message.content)[1]);

            if(this.message.guild.members.find('id', this.message.author.id).hasPermission('MANAGE_GUILD')){
              db.query(`SELECT balance FROM users WHERE discord_id='${user.id}' AND guild_id='${this.message.guild.id}';`, (err, result)=>{
                if(err){
                  this.message.channel.send('Failed to credit this user');

                } else {
                  let balance = parseInt(result[0].balance);
                  let amount = balance + parseInt(regex.exec(this.message.content)[2]);
                  db.query(`UPDATE users SET balance=${amount} WHERE discord_id='${user.id}' AND guild_id='${this.message.guild.id}'`, (err)=>{
                    
                    if(err){
                      this.message.channel.send('Failed to credit this user');
                    } else {
                      this.message.channel.send(`This account has been successfully credited !\n Balance is now \`${amount}\``)
                    }
                  });
                }
              });
            } else {
              this.message.channel.send('You\'re not allowed to use this command');
            }
          } else {
            this.message.channel.send('You must enter a valid user tag');
          }
        } else {
          this.message.channel.send('You must enter a user tag and an amount');
        }

      //setSalary
      } else if(this.message.content.split(' ')[1] == 'setSalary') {
        let regex = /<@!?(\d+)> (\d+)$/;

        if(regex.test(this.message.content)){

          if(this.message.guild.members.find('id', regex.exec(this.message.content)[1])){
            let user = this.message.guild.members.find('id', regex.exec(this.message.content)[1]);
            let amount = regex.exec(this.message.content)[2];

            if(this.message.guild.members.find('id', this.message.author.id).hasPermission('MANAGE_GUILD')){
              db.query(`UPDATE users SET salary=${amount} WHERE discord_id='${user.id}' AND guild_id='${this.message.guild.id}';`, (err)=>{
              
                if(err){
                  this.message.channel.send('Failed to set the salary of this user');
                } else {
                  this.message.channel.send(`The salary of this user is now \`${amount}\``);
                }
              });
            } else {
              this.message.channel.send('You\'re not allowed to use this command');
            }
          } else {
            this.message.channel.send('You must enter a valid user tag');
          }
        } else {
          this.message.channel.send('You must enter a user tag and an amount');
        }

      //giveSalary
      } else if(this.message.content.split(' ')[1] == 'giveSalary') {
        let user = this.message.guild.members.find('id', this.message.author.id);

        if(user.hasPermission('MANAGE_GUILD')) {
          db.query(`UPDATE users SET balance=balance+salary;`, (err)=>{

            if(err){
              this.message.channel.send('Failed to give salary');
            } else {
              this.message.channel.send('Salary has been successfully given to all accounts');
            }
          });
        } else {
          this.message.channel.send('You\'re not allowed to use this command');
        }

      //transfer
      } else if(this.message.content.split(' ')[1] == 'transfer') {
        let regex = /<@!?(\d+)> <@!?(\d+)> (\d+)$/;

        if(regex.test(this.message.content)) {

          if(this.message.guild.members.find('id', regex.exec(this.message.content)[1])) {
            let user1 = this.message.guild.members.find('id', regex.exec(this.message.content)[1]);

            if((this.message.author.id == user1.id) || (this.message.guild.members.find('id', this.message.author.id).hasPermission('MANAGE_GUILD'))) {

              if(this.message.guild.members.find('id', regex.exec(this.message.content)[2])) {
                let user2 = this.message.guild.members.find('id', regex.exec(this.message.content)[2]);
                db.query(`SELECT balance FROM users WHERE (discord_id='${user1.id}' OR discord_id='${user2.id}') AND guild_id='${this.message.guild.id}'`, (err, result)=>{

                  if(err){
                    this.message.channel.send('Failed to transfer this amount');

                  } else if(result.length == 2){
                    db.query(`START TRANSACTION;`);
                    db.query(`UPDATE users SET balance=balance-${regex.exec(this.message.content)[3]} WHERE discord_id=${user1.id} AND guild_id=${this.message.guild.id};`, (err)=>{

                      if(err){
                        console.error(err);
                        this.message.channel.send('Failed to transfer this amount');
                        db.query(`ROLLBACK;`);

                      } else {
                        db.query(`UPDATE users SET balance=balance+${regex.exec(this.message.content)[3]} WHERE discord_id=${user2.id} AND guild_id=${this.message.guild.id};`, (err)=>{

                          if(err){
                            console.error(err);
                            db.query(`ROLLBACK;`);
                            this.message.channel.send('Failed to transfer this amount');

                          } else {
                            db.query(`COMMIT;`);
                            this.message.channel.send('Successfully transfered this amount');
                          }
                        });
                      }
                    });
                  } else {
                    this.message.channel.send('At least one of the users does not exist');
                  }
                });
              } else {
                this.message.channel.send('You must enter a valid user tag');
              }
            } else {
              this.message.channel.send('You are not allowed to make this transfer');
            }
          } else {
            this.message.channel.send('You must enter a valid user tag');
          }
        } else {
          this.message.channel.send('You must enter two user tags and a positive amount');
        }
      } else {
        //TODO : display help
      }
    }
  }
}