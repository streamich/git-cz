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
      return {
        dir,
        overrides: require(filename)
      };
    }
  }

  const parent = path.resolve(dir, '..');

  const pkgFilename = path.join(dir, 'package.json');

  if (fs.existsSync(pkgFilename)) {
    try {
      const changelog = require(pkgFilename).config.commitizen.changelog;

      if (changelog) {
        return {
          dir,
          overrides: changelog
        };
      }
    // eslint-disable-next-line no-empty
    } catch (error) {}
  }

  if (parent !== dir) {
    return findOverrides(parent);
  }

  return {
    dir,
    overrides: null
  };
};

const getConfigContext = (currentConfigDir) => {
  const memo = {parentConfig: null};

  return {
    defaultConfig: defaults,
    get parentConfig () {
      if (memo.parentConfig) {
        return memo.parentConfig;
      }

      const parent = path.resolve(currentConfigDir, '..');

      // eslint-disable-next-line no-use-before-define
      memo.parentConfig = getConfig(parent);

      return memo.parentConfig;
    }
  };
};

const getOverrides = (root) => {
  // eslint-disable-next-line prefer-const
  let {overrides, dir: overridesDir} = findOverrides(root);

  if (typeof overrides === 'function') {
    overrides = overrides(getConfigContext(overridesDir));
  }

  return overrides;
};

const getConfig = (root) => {
  const overrides = getOverrides(root);

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
