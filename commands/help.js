const { RichEmbed} = require('discord.js')

module.exports = (client, msg, prefix, args) => {
  msg.channel.send(new RichEmbed()
      .setTitle('LightBot Commands :')
      .setColor('#f2ad16')
      .setDescription(
        `\`${prefix}help\` - Display help\n` +
        `\`${prefix}ping\` - Answer "pong !"\n` +
        `\`${prefix}population\` - Display the current member count of this Discord server\n` +
        `\`${prefix}search\` \`<your-search>\` - Search on google\n` +
        `\`${prefix}userInfos\` - Send you a DM with additional informations about your account\n` +
        `\`${prefix}purge\` \`<number>\` - *(admin)* Delete the last messages on the current channel\n` +
        `\`${prefix}settings\` - *(admin)* All settings concerning this Discord server. Type \`${prefix}settings help\` to get some help about the settings\n` +
        `\`${prefix}bank\` - All bank system commands. Type \`${prefix}bank help\` to get some help about the bank system`
      )
      .setFooter(`Requested by : ${msg.author.tag}`)
    )
}
