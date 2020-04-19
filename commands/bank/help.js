const { RichEmbed } = require('discord.js')

module.exports = (msg, prefix, args) => {
  msg.delete().catch(err => {
    console.error(err)
  })
  
  msg.channel.send(new RichEmbed()
      .setTitle('LightBot Bank Commands :')
      .setColor('#f2ad16')
      .setDescription(
        `\`createAccount\` \`<userTag>\` - Creates a new bank account for this user\n` +
        `\`add\` \`<userTag>\` \`<amount>\` - Adds this amount to the account of the specified user\n` +
        `\`balance\` \`<userTag>\` - Displays the balance of this user\n` +
        `\`transfer\` \`<user1Tag>\` \`<user2Tag>\` \`<amount>\` - Transfers this amount from user1 to user2\n` +
        `\`setSalary\` \`<userTag>\` \`<amount>\` - Sets the salary of the specified user to this amount\n` +
        `\`giveSalary\` - Adds to all acounts the amount of their salaries. If they have not, no money is added`
      )
      .setFooter(`Requested by : ${msg.author.tag}`)
    )
}