module.exports = {
  parser: 'babel-eslint',
  extends: [
    'eslint-config-airbnb',
    'eslint-config-prettier',
    'eslint-config-prettier/react',
  ],
  plugins: [
    'eslint-plugin-react',
    'eslint-plugin-prettier',
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-import',
  ],
  rules: {
    'no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
  },
};
