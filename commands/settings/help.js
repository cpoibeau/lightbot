const { RichEmbed} = require('discord.js')

module.exports = (msg, prefix, args, db) => {
  msg.delete().catch(err => {
    console.error(err)
  })
  
  msg.channel.send(new RichEmbed()
      .setTitle('LightBot Settings :')
      .setColor('#f2ad16')
      .setDescription(
        `\`setPrefix\` \`<prefix>\` - Sets the prefix of Lightbot on this server\n` +
        `\`setWelcomeChannel\` \`<channel name>\` - Sets the channel where welcome messages are displayed\n` +
        `\`setWelcomeMessage\` \`<message>\` - Sets the message displayed on new people arrival`
      )
      .setFooter(`Requested by : ${msg.author.tag}`)
    )
}
