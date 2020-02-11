#!/usr/bin/env node
const path = require('path');
const { spawnSync } = require('child_process');
const fs = require('fs');

/* eslint-disable import/no-dynamic-require */
const packageContents = require(path.resolve(process.cwd(), 'package.json'));

const reactInPackages =
  Object.keys(packageContents.dependencies || {}).includes('react') ||
  Object.keys(packageContents.devDependencies || {}).includes('react');

const core = ['eslint', 'prettier'];

const config = '@hellpack/eslint-config-hellpack';

const plugins = ['eslint-plugin-prettier', 'eslint-plugin-import'].concat(
  reactInPackages ? ['eslint-plugin-react', 'eslint-plugin-jsx-a11y'] : [],
);

const installEslintPlugins = spawnSync(
  'yarn',
  ['add', config, ...plugins, ...core, '-D'],
  {
    env: process.env,
    stdio: 'inherit',
  },
);

if (installEslintPlugins.error || installEslintPlugins.status !== 0) {
  console.log(
    'Eslint Plugins Installation failed, more:',
    installEslintPlugins.error,
  );

  console.log(
    'Please install yourself:\n',
    `yarn add ${core
      .concat(plugins)
      .concat(config)
      .join(' ')} -D`,
  );
}

const eslint = {
  extends: config,
  plugins,
};

fs.writeFileSync(
  path.resolve(process.cwd(), '.eslintrc'),
  JSON.stringify(eslint, null, 2),
);
