/**
 * Entry Script
 */
const config = require('./paths')
const polyfill = require('@jetpack/node-alpha/lib/polyfill')

polyfill(config, { dev: './src/server', prod: './dist/server.bundle' })
