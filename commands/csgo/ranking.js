const { HLTV } = require('hltv')
const { RichEmbed} = require('discord.js')

module.exports = (msg, prefix, args, db) => {
  HLTV.getTeamRanking()
  .catch(err => console.error(err))
  .then(ranking => {
    let desc = ''
    
    for(i = 0; i < 20; i++){
      team = ranking[i]
      
      desc += `**${team.place}**   (${team.points})  -  ${team.team.name}\n`
    }

    msg.channel.send(new RichEmbed()
    .setTitle(`CS:GO Team Ranking`)
    .setColor('#f2ad16')
    .setTimestamp(Date.now())
    .setDescription(desc)
    .setFooter(`Requested by : ${msg.author.tag}`)
    )
  })
}