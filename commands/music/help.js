const { RichEmbed } = require('discord.js')

module.exports = (msg, prefix, args) => {
  msg.delete().catch(err => {
    console.error(err)
  })
  
  msg.channel.send(new RichEmbed()
      .setTitle('LightBot Music Commands :')
      .setColor('#f2ad16')
      .setDescription(
        `\`play\` - Make lightbot joins your channel and play *Kaaris - Sevrak* (more songs incomming)\n` +
        `\`pause\` - Pause the current track. Type \`${prefix}play\` to resume.\n` +
        `\`stop\` - Stop the song and clear the current playlist\n` +
        `\`leave\` - Make lightbot leaves your channel`
      )
      .setFooter(`Requested by : ${msg.author.tag}`)
    )
}