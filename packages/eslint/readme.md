## @hellpack/eslint

_Latest Prettier and Eslint config for your projects_

Ultracommon eslint config used in my projects, no need to install `eslint` or `babel-eslint` `@hellpack/eslint`

#### Usage

- Install @hellpack/eslint `yarn add @hellpack/eslint -D`.
- Create a .eslintrc.js file and add this

```javascript
module.exports = require('@hellpack/eslint')({
  /*Add your custom rules here*/
});
```

- For example,

```javascript
module.exports = require('@hellpack/eslint')({
  rules: {
    quotes: ['error', 'single'],
    'prefer-template': 0,
    'no-console': 2,
    'import/no-unresolved': ['error', { ignore: ['express-helpers'] }],
  },
  globals: {
    fetch: true,
  },
});
```

### Uses

- `babel-eslint`
- `eslint`
- `eslint-config-airbnb`
- `eslint-config-prettier`
- `eslint-plugin-import`
- `eslint-plugin-jsx-a11y`
- `eslint-plugin-prettier`
- `eslint-plugin-prettier`
