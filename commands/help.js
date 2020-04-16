const { RichEmbed} = require('discord.js')

module.exports = (client, msg, prefix, args, db) => {
  msg.delete().catch(err => {
    console.error(err)
  })
  
  msg.channel.send(new RichEmbed()
      .setTitle('LightBot Commands :')
      .setColor('#f2ad16')
      .setDescription(
        `\`${prefix}help\` - Displays help\n` +
        `\`${prefix}ping\` - Answers "pong !"\n` +
        `\`${prefix}population\` - Displays the current member count of this Discord server\n` +
        `\`${prefix}userInfos\` - Sends you a DM with additional informations about your account\n` +
        `\`${prefix}purge\` \`<number>\` - Deletes the last messages on the current channel\n` +
        `\`${prefix}csgo\` - All CS:GO commands. Type \`${prefix}csgo help\` to get some help about the CS:GO commands\n` +
        `\`${prefix}settings\` - All settings concerning this Discord server. Type \`${prefix}settings help\` to get some help about the settings\n` +
        `\`${prefix}bank\` - All bank system commands. Type \`${prefix}bank help\` to get some help about the bank system \n` +
        `\`${prefix}music\` - All music commands. Type \`${prefix}music help\` to get some help about the music commands`
      )
      .setFooter(`Requested by : ${msg.author.tag}`)
    )
}
