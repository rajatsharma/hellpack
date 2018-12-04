const { merge: eslintMerge } = require('eslint/lib/config/config-ops');

const config = (other = {}) =>
  eslintMerge(
    {
      parser: 'babel-eslint',
      extends: [
        require.resolve('eslint-config-airbnb'),
        require.resolve('eslint-config-prettier'),
        require.resolve('eslint-config-prettier/react'),
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
    },
    other,
  );

module.exports = config;
