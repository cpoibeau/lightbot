const fs = require('fs')

module.exports = (path, client, db) => {
  fs.readdir(path, (err, items) => {
    if (err) console.error(err)
    
    items.forEach( (file) => {
      name = file.split('.')[0]
      client.on(name, require('../' + path + name).bind(null, client, db))
    })
  })
}
