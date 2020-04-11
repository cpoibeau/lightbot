const { RichEmbed } = require('discord.js')

module.exports = (client, msg, prefix, args, db) => {
  msg.channel.send(new RichEmbed()
      .setTitle('LightBot Bank Commands :')
      .setColor('#f2ad16')
      .setDescription(
        `WIP`
      )
      .setFooter(`Requested by : ${msg.author.tag}`)
    )
}