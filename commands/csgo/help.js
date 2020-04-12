const { RichEmbed } = require('discord.js')

module.exports = (msg, prefix, args, db) => {
  msg.channel.send(new RichEmbed()
      .setTitle('LightBot CS:GO Commands :')
      .setColor('#f2ad16')
      .setDescription(
        `\`csInfos\` - Displays the 5 upcoming eSport matches\n`
      )
      .setFooter(`Requested by : ${msg.author.tag}`)
    )
}