const jsMorpher = {
  presets: [
    [require.resolve('babel-preset-env'), {
      'targets': {
        'node': 'current'
      }
    }],
    [require.resolve('babel-preset-stage-2')],
    [require.resolve('babel-preset-flow')]
  ],
  plugins: [
    [require.resolve('babel-plugin-flow-runtime')],
    [require.resolve('babel-plugin-transform-regenerator'), {
      'asyncGenerators': true,
      'generators': true,
      'async': true
    }],
    [require.resolve('babel-plugin-transform-decorators-legacy')]
  ]
}

module.exports = jsMorpher
