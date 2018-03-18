const fs = require('fs')
const path = require('path')

module.exports = {
  openFile (file, callback) {
    if (!file) {
      throw Error('Dosya yolu belirtilmemiş!')
    }

    fs.readFile(path.resolve(file), 'utf8', (err, data) => {
      callback(err, data)
    })
  }
}