/* eslint-disable global-require, import/no-dynamic-require */
const path = require('path');
const defaults = require('./defaults');
const signale = require('signale');

const configFiles = [
  'changelog.config.js',
  'changelog.config.json'
];

const findOverrides = () => {
  const dir = process.cwd();

  for (const file of configFiles) {
    try {
      return require(path.join(dir, file));
    // eslint-disable-next-line no-empty
    } catch (error) {}
  }

  try {
    const changelog = require(path.join(dir, 'package.json')).config.commitizen.changelog;

    if (changelog) {
      return changelog;
    }
  // eslint-disable-next-line no-empty
  } catch (error) {}

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
