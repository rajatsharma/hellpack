const nodeExternals = require('webpack-node-externals')
const fs = require('fs')
const path = require('path')
const babelMorpher = require('./babeljs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = ({ entry, output }) => ({
  entry: [require.resolve('babel-polyfill'), require.resolve('flow-runtime'), ...entry],
  output,
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', resolveApp('node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        query: babelMorpher
      }
    ]
  },
  // https://stackoverflow.com/questions/33001237/webpack-not-excluding-node-modules
  // From your config file, it seems like you're only excluding node_modules from being parsed with babel-loader, but not from being bundled.
  // In order to exclude node_modules from build, https://github.com/kriasoft/react-starter-kit/issues/249
  externals: [nodeExternals()]
})
