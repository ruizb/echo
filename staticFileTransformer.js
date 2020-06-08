const path = require('path')

module.exports = {
  // e.g. require('../some-sound.wav') is transformed into 'some-sound'
  process(src, filename, config, options) {
    return (
      'module.exports = { default: ' +
      JSON.stringify(path.basename(filename)) +
      ' };'
    )
  }
}
