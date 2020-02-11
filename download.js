const fs = require('fs');
const path = require('path');
const request = require('got');
const stream = require('stream');
const { promisify } = require('util');
const zlib = require('zlib');
const pkg = require('./package.json');

const pipeline = promisify(stream.pipeline);

function exitFailure(url, message) {
  console.error(`Downloading failed: ${message} from ${url}`);
  process.exit(1);
}

function reportDownload(version, url) {
  console.log(`Downloading Hellpack ${version} from ${url}`);
}

module.exports = async (callback) => {
  // figure out URL of binary
  const version = pkg.version.replace(/^(\d+\.\d+\.\d+).*$/, '$1'); // turn '1.2.3-alpha' into '1.2.3'
  const os = { darwin: 'mac', win32: 'windows', linux: 'linux' }[process.platform];
  const arch = { x64: '64-bit', ia32: '32-bit' }[process.arch];
  const url = `https://github.com/rajatsharma/hellpack/releases/download/${version}/binary-for-${os}-${arch}.gz`;

  reportDownload(version, url);

  // figure out where to put the binary
  // (calls path.resolve() to get path separators right on Windows)
  const binaryPath = path.resolve(__dirname, pkg.bin.hellpack) + (process.platform === 'win32' ? '.exe' : '');

  // set up handler for request failure
  function reportDownloadFailure(error) {
    exitFailure(url, `Something went wrong while fetching the following URL:\n\n${url}\n\nIt is saying:\n\n${error}`);
  }

  // set up decompression pipe
  const gunzip = zlib.createGunzip().on('error', (error) => {
    exitFailure(url, `I ran into trouble decompressing the downloaded binary. It is saying:\n\n${error}`);
  });

  // set up file write pipe
  const write = fs.createWriteStream(binaryPath, {
    encoding: 'binary',
    mode: 0o755,
  }).on('finish', callback).on('error', (error) => {
    exitFailure(url, `I had some trouble writing file to disk. It is saying:\n\n${error}`);
  });

  // put it all together
  // request(url).on('error', reportDownloadFailure).pipe(gunzip).pipe(write);

  await pipeline(
    request.stream(url),
    gunzip,
    write,
  ).catch(reportDownloadFailure);
};
