const { HLTV } = require('hltv')
const { RichEmbed} = require('discord.js')

module.exports = (msg, prefix, args) => {
  args.shift()
  if (!args) return

  HLTV.getPlayerByName({name: args[0]})
  .catch(err => console.error(err))
  .then(player => {
    msg.channel.send(new RichEmbed()
      .setTitle(`${player.ign} profile`)
      .setColor('#f2ad16')
      .setDescription(
        `Name : ${player.name}, Age : ${player.age}\n` +
        `Team : ${player.team.name}\n` +
        `Country : ${player.country.name}\n`
      )
      .setThumbnail(player.image)
      .setFooter(`Requested by : ${msg.author.tag}`)
    ) 
  })
}