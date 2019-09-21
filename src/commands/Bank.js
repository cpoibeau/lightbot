const Connection = require('../../config/connection')

let db = new Connection().sqlConnection()

module.exports = class Bank {
  constructor(prefix, msg) {
    this.prefix = prefix
    this.message = msg
  }

  createAccount(){
    let regex = /<@!?(\d+)>/

    if(regex.test(this.message.content)){

      if(this.message.guild.members.find('id', regex.exec(this.message.content)[1])){

        let user = this.message.guild.members.find('id', regex.exec(this.message.content)[1])
        db.query(`INSERT INTO users (discord_id, username, guild_id, guild_name) VALUES ('${user.id}', '${user.displayName}', '${this.message.guild.id}', '${this.message.guild.name}');`, (err)=> {
          
          if(err){
            this.message.channel.send('This account is already existing')
            console.error(err)
          } else {
            this.message.channel.send('Account successfully created')
          }
        })
      } else {
        this.message.channel.send('You must enter a valid user tag')
      }
    } else {
      this.message.channel.send('You must enter a user tag')
    }
  }

  balance(){
    let regex = /<@!?(\d+)>/

    if(regex.test(this.message.content)){

      if(this.message.guild.members.find('id', regex.exec(this.message.content)[1])){
        let user = this.message.guild.members.find('id', regex.exec(this.message.content)[1])
        db.query(`SELECT balance FROM users WHERE discord_id='${user.id}' AND guild_id='${this.message.guild.id}';`, (err, result)=>{
          
          if(err){
            this.message.channel.send('There is no account for this user')
          } else {
            this.message.channel.send(`Available balance : \`${result[0].balance}\``)
          }
        })

      } else {
        this.message.channel.send('You must enter a valid user tag')
      }
    } else {
      this.message.channel.send('You must enter a user tag')
    }
  }

  add(){
    let regex = /<@!?(\d+)> (-?\d+)$/

    if(regex.test(this.message.content)){

      if(this.message.guild.members.find('id', regex.exec(this.message.content)[1])){
        let user = this.message.guild.members.find('id', regex.exec(this.message.content)[1])

        if(this.message.guild.members.find('id', this.message.author.id).hasPermission('MANAGE_GUILD')){
          db.query(`SELECT balance FROM users WHERE discord_id='${user.id}' AND guild_id='${this.message.guild.id}';`, (err, result)=>{
            if(err){
              this.message.channel.send('Failed to credit this user')

            } else {
              let balance = parseInt(result[0].balance)
              let amount = balance + parseInt(regex.exec(this.message.content)[2])
              db.query(`UPDATE users SET balance=${amount} WHERE discord_id='${user.id}' AND guild_id='${this.message.guild.id}'`, (err)=>{
                
                if(err){
                  this.message.channel.send('Failed to credit this user')
                } else {
                  this.message.channel.send(`This account has been successfully credited !\n Balance is now \`${amount}\``)
                }
              })
            }
          })
        } else {
          this.message.channel.send('You\'re not allowed to use this command')
        }
      } else {
        this.message.channel.send('You must enter a valid user tag')
      }
    } else {
      this.message.channel.send('You must enter a user tag and an amount')
    }
  }

  setSalary(){
    let regex = /<@!?(\d+)> (\d+)$/

    if(regex.test(this.message.content)){

      if(this.message.guild.members.find('id', regex.exec(this.message.content)[1])){
        let user = this.message.guild.members.find('id', regex.exec(this.message.content)[1])
        let amount = regex.exec(this.message.content)[2]

        if(this.message.guild.members.find('id', this.message.author.id).hasPermission('MANAGE_GUILD')){
          db.query(`UPDATE users SET salary=${amount} WHERE discord_id='${user.id}' AND guild_id='${this.message.guild.id}';`, (err)=>{
          
            if(err){
              this.message.channel.send('Failed to set the salary of this user')
            } else {
              this.message.channel.send(`The salary of this user is now \`${amount}\``)
            }
          })
        } else {
          this.message.channel.send('You\'re not allowed to use this command')
        }
      } else {
        this.message.channel.send('You must enter a valid user tag')
      }
    } else {
      this.message.channel.send('You must enter a user tag and an amount')
    }
  }

  giveSalary(){
    let user = this.message.guild.members.find('id', this.message.author.id)

    if(user.hasPermission('MANAGE_GUILD')) {
      db.query(`UPDATE users SET balance=balance+salary;`, (err)=>{

        if(err){
          this.message.channel.send('Failed to give salary')
        } else {
          this.message.channel.send('Salary has been successfully given to all accounts')
        }
      })
    } else {
      this.message.channel.send('You\'re not allowed to use this command')
    }
  }

  transfer(){
    let regex = /<@!?(\d+)> <@!?(\d+)> (\d+)$/

    if(regex.test(this.message.content)) {

      if(this.message.guild.members.find('id', regex.exec(this.message.content)[1])) {
        let user1 = this.message.guild.members.find('id', regex.exec(this.message.content)[1])

        if((this.message.author.id == user1.id) || (this.message.guild.members.find('id', this.message.author.id).hasPermission('MANAGE_GUILD'))) {

          if(this.message.guild.members.find('id', regex.exec(this.message.content)[2])) {
            let user2 = this.message.guild.members.find('id', regex.exec(this.message.content)[2])
            db.query(`SELECT balance FROM users WHERE (discord_id='${user1.id}' OR discord_id='${user2.id}') AND guild_id='${this.message.guild.id}'`, (err, result)=>{

              if(err){
                this.message.channel.send('Failed to transfer this amount')

              } else if(result.length == 2){
                db.query(`START TRANSACTION;`)
                db.query(`UPDATE users SET balance=balance-${regex.exec(this.message.content)[3]} WHERE discord_id=${user1.id} AND guild_id=${this.message.guild.id};`, (err)=>{

                  if(err){
                    console.error(err)
                    this.message.channel.send('Failed to transfer this amount')
                    db.query(`ROLLBACK;`)

                  } else {
                    db.query(`UPDATE users SET balance=balance+${regex.exec(this.message.content)[3]} WHERE discord_id=${user2.id} AND guild_id=${this.message.guild.id};`, (err)=>{

                      if(err){
                        console.error(err)
                        db.query(`ROLLBACK;`)
                        this.message.channel.send('Failed to transfer this amount')

                      } else {
                        db.query(`COMMIT;`)
                        this.message.channel.send('Successfully transfered this amount')
                      }
                    })
                  }
                })
              } else {
                this.message.channel.send('At least one of the users does not exist')
              }
            })
          } else {
            this.message.channel.send('You must enter a valid user tag')
          }
        } else {
          this.message.channel.send('You are not allowed to make this transfer')
        }
      } else {
        this.message.channel.send('You must enter a valid user tag')
      }
    } else {
      this.message.channel.send('You must enter two user tags and a positive amount')
    }
  }

  help(){
    this.message.channel.send("Command not found :/")
  }
}