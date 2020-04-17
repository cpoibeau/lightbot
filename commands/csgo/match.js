const { HLTV } = require('hltv')
const displayResult = require('../../misc/displayResult')

module.exports = (msg, prefix, args, db) => {
  args.shift()
  if (!args) return

  if (Number(args[1])){
    displayMatch({ id: args[1] })

  } else {
    teams = args[1].toLowerCase().split('/')

    HLTV.getResults({pages: 2})
    .catch(err => console.error(err))
    .then(matches => {
      let resultList = []

      matches.forEach(match => {
        t1 = match.team1.name.toLowerCase()
        t2 = match.team2.name.toLowerCase()

        if (teams[1]) {
          if ((t1 == teams[0]&&t2 == teams[1])||(t1 == teams[1]&&t2 == teams[0])) parameter =  resultList.push(match)

        } else {
          if (t1 == teams[0]||t2 == teams[0]) parameter =  resultList.push(match)
        }
      })
      
      resultList.reverse().slice(-3).forEach(res => {
        displayResult(msg, { id: res.id })
        setTimeout(() => {return undefined}, 100)
      })
    })
  }
}