const nodeAlphaBuilder = require('@jetpack/node-alpha/lib')
const webpackConfig = require('../paths')

nodeAlphaBuilder(webpackConfig).then(_ => console.log('Done')).catch(e => console.log(e))
