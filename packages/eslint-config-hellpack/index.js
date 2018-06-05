const excludedImports = ['express-helpers'];
module.exports = {
  parser: 'babel-eslint',
  extends: require.resolve('eslint-config-airbnb-base'),
  plugins: ['import', 'flowtype', 'flowtype-errors'],
  rules: {
    'import/no-unresolved': ['error', { ignore: excludedImports }],
    'import/extensions': ['error', 'never', { ignore: excludedImports }],
    'flowtype-errors/show-errors': 'error',
    'no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
  },
};
