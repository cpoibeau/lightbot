const { HLTV } = require('hltv')
const { RichEmbed} = require('discord.js')

module.exports = (msg, prefix, args) => {
  HLTV.getResults({pages: 1})
  .catch(err => console.error(err))
  .then(results => {
    embed = new RichEmbed()
    .setTitle(`CS:GO last results`)
    .setColor('#f2ad16')
    .setTimestamp(Date.now())
    .setFooter(`Requested by : ${msg.author.tag}`)

    for(i = 4; i >= 0; i--){
      result = results[i]

      score = result.result

      embed.addField(
        `**${result.team1.name} / ${result.team2.name}**`,
        `${require('../../utils/dateParser')(new Date(result.date))}\n` +
        `${result.format}, ${result.event.name}\n` +
        `${result.result}`
      )
    }
    msg.channel.send(embed)
  })
}