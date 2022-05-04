const path = require('path')

function getFile(req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'goku.jpg'))
}

module.exports = { getFile }
