const appRoot = require('app-root-path');
const getConfig = require('./getConfig');

const createState = () => {
  const state = {
    answers: {
      body: '',
      breaking: '',
      issues: '',
      lerna: '',
      scope: '',
      subject: '',
      type: ''
    },
    config: getConfig(),
    root: String(appRoot)
  };

  return state;
};

module.exports = createState;
