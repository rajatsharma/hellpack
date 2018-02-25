const path = require('path')

const output = {
  library: 'redux-branch-actions',
  path: path.resolve(__dirname, './'),
  filename: 'index.js',
  libraryTarget: 'commonjs2'
}

module.exports = {
  output,
  entry: path.resolve(__dirname, './', 'src', 'index.js')
}
