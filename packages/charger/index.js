const buildConfig = require('./config')
const webpack = require('webpack')
const rimraf = require('rimraf')

const WebpackPromise = (env, paths) => new Promise((resolve, reject) => {
  if (!env.env) {
    reject(Error('Cannot find ENV'))
    return
  }
  webpack(buildConfig(env, paths.entry, paths.output), function (err, stats) {
    if (err) {
      reject(err)
      return
    }
    resolve(stats)
  })
})

module.exports = (paths) => WebpackPromise({ env: process.env.ENV }, paths)
  .then(stats => {
    console.log('[webpack]', stats.toString({
      colors: true
    }))
  })
  .catch(e => console.log(e))
