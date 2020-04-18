const { RichEmbed} = require('discord.js')

module.exports = (client, msg, prefix, args) => {
  msg.delete().catch(err => {
    console.error(err)
  })
  let user
  
  if (/<@!?(\d+)>/.test(args[0])) {
    user = msg.guild.members.find('id', /<@!?(\d+)>/.exec(args[0])[1]).user
  } else {
    user = msg.author
  }

  let creationDate = user.createdAt.toString().split(' ')
  msg.author.send(new RichEmbed()
    .setColor('#f2ad16')
    .setTitle('**UserInfos :**')
    .setDescription(
      `Username : ${user.tag}\n` +
      `ID : ${user.id}\n` +
      `Account creation date : ${creationDate[1]} ${creationDate[2]} ${creationDate[3]} at ${creationDate[4]}\n`
    )
    .setThumbnail(user.avatarURL)
    .setFooter(`Requested by : ${user.tag}`)
  )
}
