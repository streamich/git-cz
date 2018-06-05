const appRoot = require('app-root-path');
const getConfig = require('./getConfig');

const createState = () => {
  const state = {
    config: getConfig(),
    root: String(appRoot)
  };

  return state;
};

module.exports = createState;
