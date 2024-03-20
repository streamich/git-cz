/* eslint-disable global-require, import/no-dynamic-require */
const path = require('path');
const fs = require('fs');
const signale = require('signale');
const defaults = require('./defaults');

const configFiles = [
  '.git-cz.json',
  'changelog.config.js',
  'changelog.config.cjs',
  'changelog.config.json'
];

const findOverrides = (root) => {
  const dir = root || process.cwd();

  for (const file of configFiles) {
    const filename = path.resolve(dir, file);

    if (fs.existsSync(filename) && fs.statSync(filename).isFile()) {
      return require(filename);
    }
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

/**
 * @typedef {import("./defaults")} Config
 * @param {Config} config
 * @returns {Config}
 */
const extendsConfig = (config) => {
  const configShallowCopy = {...config};

  if (configShallowCopy.types) {
    configShallowCopy.types = Object.keys(config.types)
      .reduce((typesObject, key) => {
        typesObject[key] = {
          value: key,
          ...config.types[key]
        };

        return typesObject;
      }, {});
  }

  return configShallowCopy;
};

const getConfig = (root) => {
  const overrides = findOverrides(root);

  if (typeof overrides !== 'object') {
    signale.fatal(new TypeError('Expected changelog config to be an object.'));

    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }

  return {
    ...defaults,
    ...extendsConfig(overrides)
  };
};

module.exports = getConfig;
