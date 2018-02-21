const path = require('path')
const babelMorpher = require('../babeljs')

const polyfill = ({ dev, prod }) => {
  if (process.env.NODE_ENV === 'production') {
    // In production, serve the webpacked server file.
    require(path.resolve(process.cwd(), prod))
  } else {
    require('flow-runtime')
    // Babel polyfill to convert ES6 code in runtime
    require('babel-register')(babelMorpher)
    require('babel-polyfill')
    require(path.resolve(process.cwd(), dev))
  }
}

module.exports = polyfill
