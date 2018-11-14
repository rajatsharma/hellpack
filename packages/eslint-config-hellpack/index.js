const excludedImports = ['express-helpers'];
const globals = ['fetch', 'Transformer', 'System'];

const config = rules => ({
  parser: 'babel-eslint',
  extends: [
    require.resolve('eslint-config-airbnb-base'),
    require.resolve('eslint-config-prettier'),
  ],
  plugins: ['import'],
  globals: globals.reduce(
    (acc, x) => Object.assign({}, acc, { [x]: true }),
    {},
  ),
  rules: {
    quotes: ['error', 'single'],
    'import/no-unresolved': ['error', { ignore: excludedImports }],
    'import/extensions': ['error', 'never', { ignore: excludedImports }],
    'no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    ...rules,
  },
});

module.exports = config;
