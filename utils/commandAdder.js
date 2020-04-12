const { Collection } = require('discord.js')
const fs = require('fs')

module.exports = function browse(path, collection){
  fs.readdir(path, (err, items) => {
    if (err) console.error(err)

    items.forEach(item => {
      if (!item.endsWith('.js')){
        collection.set(item, new Collection())
        browse(path + item + '/', collection.get(item))

      } else {
        name = item.split('.')[0]
        collection.set(name.toLowerCase(), require('../' + path + name))
      }
    })
  })
}