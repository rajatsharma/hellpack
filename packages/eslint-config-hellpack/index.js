const excludedImports = ['express-helpers'];
const globals = ['fetch', 'Transformer', 'System'];

const config = {
  parser: 'babel-eslint',
  extends: require.resolve('eslint-config-airbnb-base'),
  plugins: ['import'],
  globals: globals.reduce(
    (acc, x) => Object.assign({}, acc, { [x]: true }),
    {},
  ),
  rules: {
    'import/no-unresolved': ['error', { ignore: excludedImports }],
    'import/extensions': ['error', 'never', { ignore: excludedImports }],
    'no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
  },
};

module.exports = config;
