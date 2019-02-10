## @hellpack/eslint

_Latest Prettier and Eslint config for your projects_

Ultracommon eslint config used in my projects, no need to install `eslint`, `prettier` or `babel-eslint`.

#### Usage

- Install @hellpack/eslint `yarn add @hellpack/eslint-config-hellpack -D`.
- Create a .eslintrc.js file and add this

```javascript
module.exports = {
  extends: ['@hellpack/hellpack'],
  // Custom config here
};
```

- For example,

```javascript
module.exports = {
  extends: ['@hellpack/hellpack'],
  rules: {
    quotes: ['error', 'single'],
    'prefer-template': 0,
    'no-console': 2,
  },
  globals: {
    fetch: true,
  },
};
```

### Uses

- `babel-eslint`
- `eslint`
- `eslint-config-airbnb`
- `eslint-config-prettier`
- `eslint-plugin-import`
- `eslint-plugin-jsx-a11y`
- `eslint-plugin-prettier`
- `eslint-plugin-react`
