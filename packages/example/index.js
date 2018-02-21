/**
 * Entry Script
 */
const polyfill = require('@hellpack/webpack-config/lib/polyfill');

polyfill({ dev: './src/server', prod: './dist/server.bundle' });
