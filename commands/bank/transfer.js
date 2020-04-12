module.exports = (msg, prefix, args, db) => {
  let regex = /<@!?(\d+)> <@!?(\d+)> (\d+)$/

  if(regex.test(msg.content)) {

    if(msg.guild.members.find('id', regex.exec(msg.content)[1])) {
      let user1 = msg.guild.members.find('id', regex.exec(msg.content)[1])

      if((msg.author.id == user1.id) || (msg.guild.members.find('id', msg.author.id).hasPermission('MANAGE_GUILD'))) {

        if(msg.guild.members.find('id', regex.exec(msg.content)[2])) {
          let user2 = msg.guild.members.find('id', regex.exec(msg.content)[2])
          db.query(`SELECT balance FROM users WHERE (discord_id='${user1.id}' OR discord_id='${user2.id}') AND guild_id='${msg.guild.id}'`, (err, result)=>{

            if(err){
              msg.channel.send('Failed to transfer this amount')

            } else if(result.length == 2){
              db.query(`START TRANSACTION;`)
              db.query(`UPDATE users SET balance=balance-${regex.exec(msg.content)[3]} WHERE discord_id=${user1.id} AND guild_id=${msg.guild.id};`, (err)=>{

                if(err){
                  console.error(err)
                  msg.channel.send('Failed to transfer this amount')
                  db.query(`ROLLBACK;`)

                } else {
                  db.query(`UPDATE users SET balance=balance+${regex.exec(msg.content)[3]} WHERE discord_id=${user2.id} AND guild_id=${msg.guild.id};`, (err)=>{

                    if(err){
                      console.error(err)
                      db.query(`ROLLBACK;`)
                      msg.channel.send('Failed to transfer this amount')

                    } else {
                      db.query(`COMMIT;`)
                      msg.channel.send('Successfully transfered this amount')
                    }
                  })
                }
              })
            } else {
              msg.channel.send('At least one of the users does not exist')
            }
          })
        } else {
          msg.channel.send('You must enter a valid user tag')
        }
      } else {
        msg.channel.send('You are not allowed to make this transfer')
      }
    } else {
      msg.channel.send('You must enter a valid user tag')
    }
  } else {
    msg.channel.send('You must enter two user tags and a positive amount')
  }
}