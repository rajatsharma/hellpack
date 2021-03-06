const path = require('path');
const readPkgUp = require('read-pkg-up');
const fs = require('fs');

const { pkg, path: pkgPath } = readPkgUp.sync({
  cwd: fs.realpathSync(process.cwd()),
});

const appDirectory = path.dirname(pkgPath);
const packageJson = require(path.resolve(appDirectory, 'package.json'));

const reactInPackages =
  Object.keys(packageJson.dependencies || {}).includes('react') ||
  Object.keys(packageJson.devDependencies || {}).includes('react') ||
  Object.keys(packageJson.peerDependencies || {}).includes('react');

module.exports = {
  parser: 'babel-eslint',
  extends: [
    require.resolve(
      reactInPackages ? 'eslint-config-airbnb' : 'eslint-config-airbnb-base',
    ),
  ],
  rules: Object.assign(
    reactInPackages ? { 'react/jsx-filename-extension': 0 } : {},
    {
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  ),
};
