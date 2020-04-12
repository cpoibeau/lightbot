function adminCheckFromMsg(msg){
  let member2Check = msg.guild.members.get(msg.author.id)
  return member2Check.hasPermission('MANAGE_CHANNELS') || member2Check.hasPermission('MANAGE_GUILD')
}