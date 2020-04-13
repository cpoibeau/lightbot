const { HLTV } = require('hltv')
const { RichEmbed} = require('discord.js')

module.exports = (msg, prefix, args, db) => {
  HLTV.getMatches()
  .catch(err => console.error(err))
  .then(matches => {
    embed = new RichEmbed()
    .setTitle(`CS:GO upcoming matches`)
    .setColor('#f2ad16')
    .setTimestamp(Date.now())
    .setFooter(`Requested by : ${msg.author.tag}`)
    
    for(i = 0; i < 5; i++){
      match = matches[i]

      if (match.date){
        dateString = require('../../utils/dateParser')(new Date(match.date))
      } else {
        dateString = `LIVE !`
      }

      embed.addField(
        `**${match.team1.name} / ${match.team2.name}**`,
        `${dateString}\n` +
        `${match.format}, ${match.event.name}\n`
      )
    }
    msg.channel.send(embed)
  })
}