module.exports = (client, msg, prefix, args) => {
  msg.delete().catch(err => {
    console.error(err)
  })
  
  msg.author.send(
    `Hello <@${msg.author.id}>!

**__LightBot__**
LightBot is an experimental Discord bot. This project aims to improve my JavaScript/NodeJS skills and make something cool !

You can add this bot to your Discord server at https://bit.ly/lightbot-add. Allow permissions according to what you need but all features arn't guaranteed.

Please don't hesitate to report any issues with it at https://github.com/ArcLight4/lightbot/issues.

**__Features__**
This bot contains :
\`\`\`
- an account command set
- a music command set (WIP)
- tweakable settings
- multiple other commands to manage your server
- Customable welcome message for new members on your server
\`\`\`
Moreover, I'm thinking about create a website with a kind of documentation or configuration panel, but it's not necessarily for soon.
Don't hesitate to Watch or Star my Github repository to follow the progresses of my project. You can also get in touch with me on the support Discord guild : https://discord.gg/xnPYEFF`
  )
}
