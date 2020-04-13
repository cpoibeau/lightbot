const { HLTV } = require('hltv')
const { RichEmbed} = require('discord.js')

module.exports = (msg, prefix, args, db) => {
  function displayMatch(parameter) {
    HLTV.getMatch(parameter)
    .catch(err => console.error(err))
    .then(match => {

      embed = new RichEmbed()
      .setTitle(`${match.team1.name} / ${match.team2.name}`)
      .setColor('#f2ad16')
      .setFooter(`Requested by : ${msg.author.tag}`)
      .setDescription(
        `${require('../../utils/dateParser')(new Date(match.date))}\n` +
        `${match.format}, ${match.event.name}\n` +
        `**Winner team : ${match.winnerTeam.name}**\n`
      )
      match.maps.forEach(map => {
        embed.addField(
        `**${map.name}**`,
        `${map.result}\n`
      )
      })
      msg.channel.send(embed)
    })
  }
  
  if (!args) return

  if (Number(args[1])){
    displayMatch({ id: args[1] })

  } else {
    teams = args[1].toLowerCase().split('/')

    HLTV.getResults({pages: 4})
    .catch(err => console.error(err))
    .then(matches => {

      matches.forEach(match => {
        t1 = match.team1.name.toLowerCase()
        t2 = match.team2.name.toLowerCase()

        if (teams[1]) {
          if ((t1 == teams[0]&&t2 == teams[1])||(t1 == teams[1]&&t2 == teams[0])) parameter =  displayMatch({ id: match.id })

        } else {
          if (t1 == teams[0]||t2 == teams[0]) parameter =  displayMatch({ id: match.id })
        }
      })
    })
  }
}