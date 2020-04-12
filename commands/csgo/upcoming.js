const { HLTV } = require('hltv')
const { RichEmbed} = require('discord.js')

module.exports = (msg, prefix, args, db) => {
  HLTV.getMatches()
  .catch(err => console.error(err))
  .then(matches => {
    
    for(i = 0; i < 5; i++){
      match = matches[i]

      if (match.date){
        dateString = require('../../utils/dateParser')(new Date(match.date))
      } else {
        dateString = `LIVE !`
      }

      odds = ''
      if (match.oddsCommunity) odds = `Community odds : ${match.team1.name} ${match.oddsCommunity.team1} / ${match.team2.name} ${match.oddsCommunity.team2}`

      msg.channel.send(new RichEmbed()
      .setTitle(`${match.team1.name} / ${match.team2.name}`)
      .setColor('#f2ad16')
      .setDescription(
        `${dateString}\n` +
        `${match.format}, ${match.event.name}\n` +
        odds
      )
      .setFooter(`Requested by : ${msg.author.tag}`)
      )
    }
  })
}