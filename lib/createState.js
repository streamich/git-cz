const getGitRootDir = require('./util/getGitRootDir');
const getConfig = require('./getConfig');

const createState = () => {
  const root = getGitRootDir();
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
    config: getConfig(root),
    root
  };

  return state;
};

module.exports = createState;
