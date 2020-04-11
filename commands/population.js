module.exports = (client, msg, prefix, args, db) => {
  msg.channel.send(`There are ${msg.guild.memberCount} members on this Discord server`)
}
