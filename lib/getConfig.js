/* eslint-disable global-require, import/no-dynamic-require */
const path = require('path');
const fs = require('fs');
const signale = require('signale');
const defaults = require('./defaults');

const configFiles = [
  '.git-cz.json',
  'changelog.config.js',
  'changelog.config.json'
];

const findOverrides = () => {
  const dir = process.cwd();

  for (const file of configFiles) {
    const filename = path.join(dir, file);

    if (fs.existsSync(filename)) {
      return require(filename);
    }
  }

  const pkgFilename = path.join(dir, 'package.json');

  if (fs.existsSync(pkgFilename)) {
    const changelog = require(pkgFilename).config.commitizen.changelog;

    if (changelog) {
      return changelog;
    }
  } else {
    signale.error('package.json not found, at ' + pkgFilename);
  }

  return {};
};

const getConfig = () => {
  const overrides = findOverrides();

  if (typeof overrides !== 'object') {
    signale.fatal(new TypeError('Expected changelog config to be an object.'));

    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }

  return {
    ...defaults,
    ...overrides
  };
};

module.exports = getConfig;
