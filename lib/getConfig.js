/* eslint-disable global-require, import/no-dynamic-require */
const path = require('path');
const fs = require('fs');
const signale = require('signale');
const os = require('os');
const defaults = require('./defaults');

const configFiles = [
  '.git-cz.json',
  'changelog.config.js',
  'changelog.config.cjs',
  'changelog.config.json'
];

function containConfigFile(dir) {
  for (const file of configFiles) {
    const filename = path.resolve(dir, file);

    if (fs.existsSync(filename) && fs.statSync(filename).isFile()) {
      return require(filename);
    }
  }
  return null;
}

const findOverrides = (root) => {
  const dir = root || process.cwd();

  const configContent = containConfigFile(dir);
  if (configContent !== null) {
    return configContent;
  }

  const parent = path.resolve(dir, '..');

  const pkgFilename = path.join(dir, 'package.json');

  if (fs.existsSync(pkgFilename)) {
    try {
      const changelog = require(pkgFilename).config.commitizen.changelog;

      if (changelog) {
        return changelog;
      }
    // eslint-disable-next-line no-empty
    } catch (error) {}
  }

  if (parent !== dir) {
    return findOverrides(parent);
  }

  return {};
};

const getConfig = (root) => {
  const configFolder = path.join(os.homedir(), '.config');
  const overrides = containConfigFile(configFolder) || findOverrides(root);

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
