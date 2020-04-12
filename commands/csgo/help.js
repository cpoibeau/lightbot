const { RichEmbed } = require('discord.js')

module.exports = (msg, prefix, args, db) => {
  msg.delete().catch(err => {
    console.error(err)
  })
  
  msg.channel.send(new RichEmbed()
      .setTitle('LightBot CS:GO Commands :')
      .setColor('#f2ad16')
      .setDescription(
        `\`upcoming\` - Displays the 5 upcoming eSport matches\n` +
        `\`ranking\` - Displays top 20 CS:GO eSport teams\n` +
        `\`results\` - Displays top 5 last CS:GO eSport matches, with the result of each match\n`
      )
      .setFooter(`Requested by : ${msg.author.tag}`)
    )
}