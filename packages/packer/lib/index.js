const { removeSync } = require('fs-extra')
const webpack = require('webpack')

const builder = (webpackConfiguration) =>
  new Promise((resolve, reject) => {
    removeSync(webpackConfiguration.output.path)
    const extended = require('../webpack.config.js')(webpackConfiguration)
    webpack(extended, function (err, stats) {
      if (err) {
        console.log(err)
        return
      }

      console.log(stats.toString({
        colors: true,
        chunks: false
      }))
    })
  })

module.exports = builder
