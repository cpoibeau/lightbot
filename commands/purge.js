module.exports = (client, msg, prefix, args) => {
  let a = Number(args[0])

  if (a <= 100) {
    msg.channel.bulkDelete(a)
    .catch(console.error)
  } else {
    msg.channel.send('You did not enter a valid number')
  } //TODO : Ajouter une gestion d'exception lorsque les messages sélectionés sont datés de + de 14 jours

}