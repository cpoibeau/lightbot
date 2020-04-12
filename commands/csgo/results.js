const { HLTV } = require('hltv')
const { RichEmbed} = require('discord.js')

module.exports = (msg, prefix, args, db) => {
  HLTV.getResults({pages: 1})
  .catch(err => console.error(err))
  .then(results => {
    
    for(i = 4; i >= 0; i--){
      result = results[i]

      msg.channel.send(new RichEmbed()
      .setTitle(`${result.team1.name} / ${result.team2.name}`)
      .setColor('#f2ad16')
      .setDescription(
        `${require('../../utils/dateParser')(new Date(result.date))}\n` +
        `${result.format}, ${result.event.name}\n` +
        `${result.result}`
      )
      .setFooter(`Requested by : ${msg.author.tag}`)
      )
    }
  })
}