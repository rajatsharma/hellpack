const nodeAlphaBuilder = require('@hellpack/webpack-config/lib');
const webpackConfig = require('../paths');

nodeAlphaBuilder(webpackConfig).then(_ => console.log('Done')).catch(e => console.log(e));
