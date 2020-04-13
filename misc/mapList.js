module.exports = (mapTag) => {
  switch (mapTag){
    case 'd2': return 'Dust 2'
    case 'ovp': return 'Overpass'
    case 'vertigo': return 'Vertigo'
    case 'mrg': return 'Mirage'
    case 'trn': return 'Train'
    case 'nuke': return 'Nuke'
    case 'inf': return 'Inferno'
    default: return mapTag
  }
}