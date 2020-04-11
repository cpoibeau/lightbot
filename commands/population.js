module.exports = (client, msg, prefix, args) => {
  msg.channel.send(`There are ${msg.guild.memberCount} members on this Discord server`)
}
