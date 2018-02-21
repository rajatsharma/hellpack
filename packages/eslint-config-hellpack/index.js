module.exports = {
  'parser': 'babel-eslint',
  'extends': require.resolve('eslint-config-airbnb-base'),
  'plugins': [
    'import',
    'flowtype',
    'flowtype-errors'
  ],
  rules: {
    'flowtype-errors/show-errors': 'error',
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_' }],
  }
}
