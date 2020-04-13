const { HLTV } = require('hltv')
const { RichEmbed} = require('discord.js')
const mapList = require('./mapList')

module.exports = (msg, parameter) => {
  HLTV.getMatch(parameter)
  .catch(err => console.error(err))
  .then(match => {

    embed = new RichEmbed()
    .setTitle(`${match.team1.name} / ${match.team2.name}`)
    .setColor('#f2ad16')
    .setFooter(`Requested by : ${msg.author.tag}`)
    .setDescription(
      `${require('../utils/dateParser')(new Date(match.date))}\n` +
      `${match.format}, ${match.event.name}\n` +
      `**Winner team : ${match.winnerTeam.name}**\n`
    )
    match.maps.forEach(map => {
      embed.addField(
      `**${mapList(map.name)}**`,
      `${map.result}\n`
    )
    })
    msg.channel.send(embed)
  })
}