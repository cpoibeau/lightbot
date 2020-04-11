const { RichEmbed} = require('discord.js')

module.exports = (client, msg, prefix, args, db) => {
  msg.channel.send(new RichEmbed()
      .setTitle('LightBot Commands :')
      .setColor('#f2ad16')
      .setDescription(
        `\`${prefix}help\` - Displays help\n` +
        `\`${prefix}ping\` - Answers "pong !"\n` +
        `\`${prefix}population\` - Displays the current member count of this Discord server\n` +
        `\`${prefix}search\` \`<your-search>\` - Searches on google\n` +
        `\`${prefix}userInfos\` - Sends you a DM with additional informations about your account\n` +
        `\`${prefix}purge\` \`<number>\` - *(admin)* Deletes the last messages on the current channel\n` +
        `\`${prefix}settings\` - *(admin)* All settings concerning this Discord server. Type \`${prefix}settings help\` to get some help about the settings\n` +
        `\`${prefix}bank\` - All bank system commands. Type \`${prefix}bank help\` to get some help about the bank system \n` +
        `\`${prefix}music\` - All music commands. Type \`${prefix}music help\` to get some help about the music commands`
      )
      .setFooter(`Requested by : ${msg.author.tag}`)
    )
}
