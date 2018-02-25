const path = require('path')
const babelMorpher = require('../babeljs')

const polyfill = (envs) => {
  require('@hellpack/globals')

  if (process.env.NODE_ENV === 'development') {
    require('flow-runtime')
    // Babel polyfill to convert ES6 code in runtime
    require('babel-register')(babelMorpher)
    require('babel-polyfill')
    require(path.resolve(process.cwd(), envs.development || envs.dev))
    return
  }

  if (process.env.NODE_ENV === 'production') {
    // In production, serve the webpacked server file.
    require(path.resolve(process.cwd(), envs.production || envs.prod))
    return
  }

  require(path.resolve(process.cwd(), envs[process.NODE_ENV]))
}

module.exports = polyfill
