const { RichEmbed} = require('discord.js')

module.exports = (client, msg, prefix, args) => {
  msg.delete().catch(err => {
    console.error(err)
  })

  let creationDate = msg.author.createdAt.toString().split(' ')
  msg.author.send(new RichEmbed()
    .setColor('#f2ad16')
    .setTitle('**Your profile :**')
    .setDescription(
      `Username : ${msg.author.tag}\n` +
      `ID : ${msg.author.id}\n` +
      `Account creation date : ${creationDate[1]} ${creationDate[2]} ${creationDate[3]} at ${creationDate[4]}\n`
    )
    .setThumbnail(msg.author.avatarURL)
    .setFooter(`Requested by : ${msg.author.tag}`)
  )
}
