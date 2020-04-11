const fs = require('fs')

module.exports = (path, collection) => {
  fs.readdir(path, (err, items) => {
    if (err) console.error(err)
    
    items.forEach( (file) => {
      name = file.split('.')[0]
      collection.set(name.toLowerCase(), require('../' + path + name))
    })
  })
}
